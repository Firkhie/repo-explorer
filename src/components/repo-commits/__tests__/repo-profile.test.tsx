import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { RepoProfile } from "@/components/repo-commits/repo-profile";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <picture>
      <img src={src} alt={alt} />
    </picture>
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} target="_blank">
      {children}
    </a>
  ),
}));

describe("RepoProfile", () => {
  const mockRepoDetails = {
    name: "Test Org",
    private: false,
    description: "This is a test organization.",
    html_url: "https://github.com/test-org",
    owner: {
      avatar_url: "https://example.com/avatar.png",
    },
    language: "C++",
    stargazers_count: 10,
    watchers_count: 10,
    forks_count: 10,
    open_issues_count: 10,
    topics: ["Test"],
  };

  it("renders repo profile correctly", () => {
    render(<RepoProfile repoDetails={mockRepoDetails} />);

    expect(screen.getByText("Test Org")).toBeInTheDocument();
    expect(screen.getByText("This is a test organization.")).toBeInTheDocument();
    expect(screen.getByText("Public")).toBeInTheDocument();
    expect(screen.getByText("https://github.com/test-org")).toBeInTheDocument();

    const avatar = screen.getByAltText("Test Org");
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.png");

    expect(screen.getByText("10 stars")).toBeInTheDocument();
    expect(screen.getByText("10 watchers")).toBeInTheDocument();
    expect(screen.getByText("10 forks")).toBeInTheDocument();
    expect(screen.getByText("10 issues")).toBeInTheDocument();
  });
});
