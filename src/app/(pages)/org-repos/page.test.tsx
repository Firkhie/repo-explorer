import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import OrgReposPage from "@/app/(pages)/org-repos/page";
import { OrgReposDetailsProps } from "@/components/org-repos/org-repos-details";
import { NotFoundProps } from "@/components/not-found";

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (param: string) => {
      if (param === "org") return "test-org";
      if (param === "sort_by") return "stars";
      if (param === "page") return "1";
      return "";
    },
  }),
}));

jest.mock("@/components/loading", () => {
  return {
    Loading: ({ title }: { title: string }) => <div>{title}</div>,
  };
});

jest.mock("@/components/not-found", () => ({
  NotFound: ({ title, description }: NotFoundProps) => (
    <div>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  ),
}));

jest.mock("@/components/org-repos/org-repos-details", () => ({
  OrgReposDetails: ({ orgRepos }: OrgReposDetailsProps) => (
    <div>
      <p>{orgRepos.orgDetails.login}</p>
      <p>{orgRepos.orgDetails.name}</p>
    </div>
  ),
}));

let mock: MockAdapter;
let consoleErrorMock: jest.SpyInstance; // To hide the console error 404, 500, etc. during API calls

describe("OrgReposPage", () => {
  beforeEach(() => {
    mock = new MockAdapter(axios, { delayResponse: 100 }); // Add delay to trigger the loading state
    mock
      .onGet("/api/github-org-repos?org=test-org&sort_by=stars&page=1") // Dummy API calls
      .reply(200, {
        orgDetails: {
          login: "test-org-login",
          name: "Test Organization",
        },
        repoList: [],
        pagination: {},
      });
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    mock.reset();
    consoleErrorMock.mockRestore(); // Restore the original console.error
  });

  it("renders the page with organization details", async () => {
    await act(async () => {
      render(<OrgReposPage />);
    });

    expect(await screen.findByText("test-org-login")).toBeInTheDocument();
    expect(await screen.findByText("Test Organization")).toBeInTheDocument();
  });

  it("shows loading text while fetching data", async () => {
    await act(async () => {
      render(<OrgReposPage />);
    });

    expect(await screen.findByText("Fetching organization repositories...")).toBeInTheDocument();
  });

  it("shows not found when there is a 404 error fetching data", async () => {
    mock
      .onGet("/api/github-org-repos?org=test-org&sort_by=stars&page=1")
      .reply(404);

    await act(async () => {
      render(<OrgReposPage />);
    });

    expect(await screen.findByText("No organization found")).toBeInTheDocument();
    expect(await screen.findByText("The organization you looking for does not exist, write the correct name or else it wont show up.")).toBeInTheDocument();
  });

  it("shows not found when there is a 500 error fetching data", async () => {
    mock
      .onGet("/api/github-org-repos?org=test-org&sort_by=stars&page=1")
      .reply(500);

    await act(async () => {
      render(<OrgReposPage />);
    });

    expect(await screen.findByText("No organization found")).toBeInTheDocument();
    expect(await screen.findByText("The organization you looking for does not exist, write the correct name or else it wont show up.")).toBeInTheDocument();
  });
});
