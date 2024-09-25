import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { OrgReposDetails } from "@/components/org-repos/org-repos-details";
import { OrgProfileProps } from "../org-profile";
import { OrgRepoListProps } from "../org-repo-list";

jest.mock("@/components/org-repos/org-profile", () => ({
  OrgProfile: ({ orgDetails }: OrgProfileProps) => (
    <div>
      <p>{orgDetails.name}</p>
      <p>{orgDetails.login}</p>
    </div>
  ),
}));

jest.mock("@/components/org-repos/org-repo-list", () => ({
  OrgRepoList: ({ repoList }: OrgRepoListProps) => (
    <div>
      <p>{repoList[0].name}</p>
      <p>{repoList[0].description}</p>
    </div>
  ),
}));

describe("OrgReposDetails", () => {
  it("renders correctly", () => {
    const orgRepos = {
      orgDetails: {
        login: "testorg",
        name: "Test Org",
        description: "Test organization description",
        avatar_url: "https://example.com/avatar.png",
        location: "Test Location",
        is_verified: true,
        public_repos: 5,
        followers: 100,
        following: 10,
        html_url: "https://github.com/testorg",
        blog: "https://blog.example.com",
      },
      repoList: [
        {
          name: "Test Repo",
          description: "This is a test repo",
          private: true,
          language: "Javascript",
          stargazers_count: 10000,
          forks: 2000,
          watchers: 15000,
        },
      ],
      pagination: {
        currentPage: 1,
        perPage: 10,
        totalRepos: 20,
        totalPages: 2,
      },
    };

    const { getByText } = render(<OrgReposDetails orgRepos={orgRepos} />);

    expect(getByText("Test Org")).toBeInTheDocument();
    expect(getByText("Test Repo")).toBeInTheDocument();
  });
});
