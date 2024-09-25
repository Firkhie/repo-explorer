import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import {
  OrgRepoList,
  OrgRepoListProps,
} from "@/components/org-repos/org-repo-list";
import { PaginationProviderProps } from "@/components/pagination-provider";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => ({
    get: (key: string) => (key === "org" ? "test-org" : "stars"),
  })),
}));

jest.mock("@/components/pagination-provider", () => ({
  PaginationProvider: ({
    currentPage,
    handlePageChange,
    totalPages,
  }: PaginationProviderProps) => (
    <div>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  ),
}));

const mockProps: OrgRepoListProps = {
  login: "test-org",
  pagination: {
    perPage: 10,
    currentPage: 1,
    totalRepos: 20,
    totalPages: 2,
  },
  repoList: [
    {
      name: "repo1",
      private: false,
      description: "A test repo",
      language: "JavaScript",
      stargazers_count: 5,
      forks: 2,
      watchers: 3,
    },
    {
      name: "repo2",
      private: false,
      description: "Another test repo",
      language: "TypeScript",
      stargazers_count: 10,
      forks: 4,
      watchers: 6,
    },
  ],
};

describe("OrgRepoList", () => {
  it("renders the list of repositories", () => {
    render(<OrgRepoList {...mockProps} />);

    expect(screen.getByText("repo1")).toBeInTheDocument();
    expect(screen.getByText("repo2")).toBeInTheDocument();
  });

  it("displays the NotFound component if no repos", () => {
    const emptyProps = { ...mockProps, repoList: [] };
    render(<OrgRepoList {...emptyProps} />);

    expect(screen.getByText("No repositories found")).toBeInTheDocument();
  });

  it("pagination works correctly", () => {
    render(<OrgRepoList {...mockProps} />);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(window.location.href).toContain("page=2");
  });

  it("displays the correct sorting option", async () => {
    render(<OrgRepoList {...mockProps} />);

    const dropdownButton = screen.getByText("Stars");

    // Click the button to open the dropdown, using enter since pointer-events setted to none
    fireEvent.keyDown(dropdownButton, { key: "Enter", code: "Enter" });

    // Verify that other options are available after opening the dropdown
    expect(screen.getByText("Forks")).toBeInTheDocument();
    expect(screen.getByText("Last Updated")).toBeInTheDocument();
  });
});
