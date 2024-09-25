import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { PaginationProviderProps } from "@/components/pagination-provider";
import {
  RepoCommitList,
  RepoCommitListProps,
} from "@/components/repo-commits/repo-commits-list";

jest.mock("next/navigation", () => {
  return {
    useSearchParams: () => ({
      get: (param: string) => {
        if (param === "org") return "test-org";
        if (param === "repo") return "test-repo";
        return "";
      },
    }),
  };
});

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

const mockProps: RepoCommitListProps = {
  pagination: {
    perPage: 10,
    currentPage: 1,
    totalRepos: 20,
    totalPages: 2,
  },
  commitList: [
    {
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
};

describe("RepoCommitList Component", () => {
  it("renders the list of commits", () => {
    render(<RepoCommitList {...mockProps} />);

    expect(screen.getByText(/Auth Name/i)).toBeInTheDocument();
    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  it("displays the NotFound component if no commits", () => {
    const emptyProps = { ...mockProps, commitList: [] };
    render(<RepoCommitList {...emptyProps} />);

    expect(screen.getByText("No commits found")).toBeInTheDocument();
  });

  it("pagination works correctly", () => {
    render(<RepoCommitList {...mockProps} />);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(window.location.href).toContain("page=2");
  });
});
