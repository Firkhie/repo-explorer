import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import RepoCommitsPage from "@/app/(pages)/repo-commits/page";
import { NotFoundProps } from "@/components/not-found";
import { RepoCommitsDetailsProps } from "@/components/repo-commits/repo-commits-details";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

jest.mock("next/navigation", () => {
  return {
    useSearchParams: () => ({
      get: (param: string) => {
        if (param === "org") return "test-org";
        if (param === "repo") return "test-repo";
        if (param === "page") return "1";
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

jest.mock("@/components/repo-commits/repo-commits-details", () => ({
  RepoCommitsDetails: ({ RepoCommits }: RepoCommitsDetailsProps) => (
    <div>
      <p>{RepoCommits.repoDetails.name}</p>
      <p>{RepoCommits.repoDetails.description}</p>
      <p>{RepoCommits.commitList[0].commit.author.name}</p>
    </div>
  ),
}));

let mock: MockAdapter;
let consoleErrorMock: jest.SpyInstance;

describe("RepoCommitsPage", () => {
  beforeEach(() => {
    mock = new MockAdapter(axios, { delayResponse: 100 }); // Add delay to trigger the loading state
    mock
      .onGet("/api/github-repo-commits?org=test-org&repo=test-repo&page=1") // Dummy API calls
      .reply(200, {
        repoDetails: {
          name: "Test Repo",
          description: "Test Description",
        },
        commitList: [
          {
            commit: {
              author: {
                name: "Author Name",
              },
              message: "Add to list of canonical union",
            },
          },
        ],
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

  it("renders the page with repo details", async () => {
    await act(async () => {
      render(<RepoCommitsPage />);
    });

    expect(await screen.findByText("Test Repo")).toBeInTheDocument();
    expect(await screen.findByText("Test Description")).toBeInTheDocument();
    expect(await screen.findByText("Author Name")).toBeInTheDocument();
  });

  it("shows loading text while fetching data", async () => {
    await act(async () => {
      render(<RepoCommitsPage />);
    });

    expect(
      await screen.findByText(
        "Fetching repository detail and commit history list..."
      )
    ).toBeInTheDocument();
  });

  it("shows not found when there is a 404 error fetching data", async () => {
    mock
      .onGet("/api/github-repo-commits?org=test-org&repo=test-repo&page=1")
      .reply(404);

    await act(async () => {
      render(<RepoCommitsPage />);
    });

    expect(
      await screen.findByText("No commit history found")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "The commit history you looking for does not exist."
      )
    ).toBeInTheDocument();
  });

  it("shows not found when there is a 500 error fetching data", async () => {
    mock
      .onGet("/api/github-repo-commits?org=test-org&repo=test-repo&page=1")
      .reply(500);

    await act(async () => {
      render(<RepoCommitsPage />);
    });

    expect(
      await screen.findByText("No commit history found")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "The commit history you looking for does not exist."
      )
    ).toBeInTheDocument();
  });
});
