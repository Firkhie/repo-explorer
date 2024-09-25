import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { RepoCommitsDetails } from "@/components/repo-commits/repo-commits-details";
import { RepoProfileProps } from "../repo-profile";
import { RepoCommitListProps } from "../repo-commits-list";

jest.mock("@/components/repo-commits/repo-profile", () => ({
  RepoProfile: ({ repoDetails }: RepoProfileProps) => (
    <div>
      <p>{repoDetails.name}</p>
      <p>{repoDetails.description}</p>
    </div>
  ),
}));

jest.mock("@/components/repo-commits/repo-commits-list", () => ({
  RepoCommitList: ({ commitList }: RepoCommitListProps) => (
    <div>
      <p>{commitList[0].commit.author.name}</p>
      <p>{commitList[0].committer.login}</p>
    </div>
  ),
}));

describe("OrgReposDetails", () => {
  it("renders correctly", () => {
    const repoCommits = {
      repoDetails: {
        login: "testorg",
        name: "Test Org",
        description: "Test organization description",
        location: "Test Location",
        is_verified: true,
        public_repos: 5,
        followers: 100,
        following: 10,
        html_url: "https://github.com/testorg",
        blog: "https://blog.example.com",
        private: true,
        owner: {
          avatar_url: "https://example.com/avatar.png",
        },
        stargazers_count: 1000,
        watchers_count: 1000,
        language: "C++",
        forks_count: 100,
        open_issues_count: 100,
        topics: ["Test"],
      },
      commitList: [
        {
          name: "Test Repo",
          description: "This is a test repo",
          private: true,
          language: "Javascript",
          stargazers_count: 10000,
          forks: 2000,
          watchers: 15000,
          sha: "a312531221saddasd12w221",
          commit: {
            message: "Test Message",
            author: {
              name: "Auth Name",
              email: "Auth@example.id",
              date: "2020-11-04T10:05:53Z",
            },
          },
          html_url: "https://github.com/testcommit",
          committer: {
            login: "Log Name",
            avatar_url: "https://example.com/avatar.png",
          },
        },
      ],
      pagination: {
        currentPage: 1,
        perPage: 10,
        totalRepos: 20,
        totalPages: 2,
      },
    };

    const { getByText } = render(
      <RepoCommitsDetails RepoCommits={repoCommits} />
    );

    expect(getByText("Test Org")).toBeInTheDocument();
    expect(getByText("Auth Name")).toBeInTheDocument();
  });
});
