import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import HomePage from "@/app/(pages)/(home)/page";
import { OrgCardProps } from "@/components/org-card";

jest.mock("@/components/search-form", () => {
  return {
    SearchForm: () => <div>Search Form</div>,
  };
});

jest.mock("@/components/org-card", () => {
  return {
    OrgCard: ({ orgProfile }: OrgCardProps) => (
      <div data-testid="org-card">{orgProfile.name}</div>
    ),
  };
});

const mockOrgProfiles = [
  { name: "Meta" },
  { name: "Google" },
  { name: "Microsoft" },
  { name: "Mozilla" },
  { name: "Apache Software Foundation" },
  { name: "Node.js" },
  { name: "TensorFlow" },
  { name: "Kubernetes" },
];

describe("HomePage", () => {
  it("renders home page", () => {
    render(<HomePage />);

    expect(screen.getByText("Search Form")).toBeInTheDocument();

    const orgCards = screen.getAllByTestId("org-card");
    expect(orgCards.length).toBeGreaterThan(0); // Ensure at least one OrgCard is rendered

    // Check if each OrgCard contains text (mocking dynamic data)
    orgCards.forEach((card, index) => {
      expect(card).toHaveTextContent(mockOrgProfiles[index].name); // Ensure OrgCard has expected name
    });
  });
});
