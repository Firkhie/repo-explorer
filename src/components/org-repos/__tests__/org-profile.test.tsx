import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OrgProfile } from "@/components/org-repos/org-profile";

// Mock next/image and next/link
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

describe("OrgProfile", () => {
  const mockOrgDetails = {
    login: "test-org",
    name: "Test Org",
    description: "This is a test organization.",
    avatar_url: "https://example.com/avatar.png",
    location: "Test City",
    is_verified: true,
    public_repos: 10,
    followers: 100,
    following: 20,
    html_url: "https://github.com/test-org",
    blog: "https://blog.test.com",
  };

  it("renders org profile correctly", () => {
    render(<OrgProfile orgDetails={mockOrgDetails} />);

    // Check if name is rendered
    expect(screen.getByText("Test Org")).toBeInTheDocument();

    // Check if the description is rendered
    expect(
      screen.getByText("This is a test organization.")
    ).toBeInTheDocument();

    // Check if the location is rendered
    expect(screen.getByText("Test City")).toBeInTheDocument();

    // Check if public repos, followers, following, etc. are rendered
    expect(screen.getByText("10 public repositories")).toBeInTheDocument();
    expect(screen.getByText("100 followers")).toBeInTheDocument();
    expect(screen.getByText("20 following")).toBeInTheDocument();

    // Check if the avatar image is rendered
    const avatar = screen.getByAltText("Test Org");
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.png");

    // Check if the GitHub and blog links are rendered
    const githubLink = screen.getByText("https://github.com/test-org");
    expect(githubLink).toHaveAttribute("href", "https://github.com/test-org");

    const blogLink = screen.getByText("https://blog.test.com");
    expect(blogLink).toHaveAttribute("href", "https://blog.test.com");
  });

  it("renders default values when fields are missing", () => {
    const incompleteOrgDetails = {
      ...mockOrgDetails,
      location: "",
      blog: "",
    };

    render(<OrgProfile orgDetails={incompleteOrgDetails} />);

    // Check for default blog link ("-") when blog is missing
    expect(screen.getByText("-", { selector: "p" })).toBeInTheDocument();
  });
});
