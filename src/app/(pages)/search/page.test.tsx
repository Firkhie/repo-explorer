import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import SearchPage from "@/app/(pages)/search/page";
import { NotFoundProps } from "@/components/not-found";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { OrgCardProps } from "@/components/org-card";

jest.mock("next/navigation", () => {
  return {
    useSearchParams: () => ({
      get: (param: string) => {
        if (param === "org") return "test-org";
        return "";
      },
    }),
  };
});

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

jest.mock("@/components/search-form", () => {
  return {
    SearchForm: () => <div>Search Form</div>,
  };
});

jest.mock("@/components/org-card", () => {
  return {
    OrgCard: ({ orgProfile }: OrgCardProps) => (
      <div>
        <p>{orgProfile.name}</p>
        <p>{orgProfile.description}</p>
      </div>
    ),
  };
});

let mock: MockAdapter;
let consoleErrorMock: jest.SpyInstance;

describe("SearchPage", () => {
  beforeEach(() => {
    mock = new MockAdapter(axios, { delayResponse: 100 }); // Add delay to trigger the loading state
    mock
      .onGet("/api/github-org-list?org=test-org") // Dummy API calls
      .reply(200, [
        {
          name: "Org Name Test 1",
          description: "Description Test 1",
        },
        {
          name: "Org Name Test 2",
          description: "Description Test 2",
        },
      ]);
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    mock.reset();
    consoleErrorMock.mockRestore(); // Restore the original console.error
  });

  it("renders the page with list of organizations", async () => {
    await act(async () => {
      render(<SearchPage />);
    });

    expect(await screen.findByText("Org Name Test 1")).toBeInTheDocument();
    expect(await screen.findByText("Description Test 1")).toBeInTheDocument();
    expect(await screen.findByText("Org Name Test 2")).toBeInTheDocument();
    expect(await screen.findByText("Description Test 2")).toBeInTheDocument();
  });

  it("shows loading text while fetching data", async () => {
    await act(async () => {
      render(<SearchPage />);
    });

    expect(
      await screen.findByText(
        "Fetching organization repositories..."
      )
    ).toBeInTheDocument();
  });

  it("shows not found when there is a no organizations found", async () => {
    mock
    .onGet("/api/github-org-list?org=test-org") // Dummy API calls
    .reply(200, []);

    await act(async () => {
      render(<SearchPage />);
    });

    expect(
      await screen.findByText("No organization found")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "The organization you looking for does not exist, write the correct name or else it wont show up."
      )
    ).toBeInTheDocument();
  });
});
