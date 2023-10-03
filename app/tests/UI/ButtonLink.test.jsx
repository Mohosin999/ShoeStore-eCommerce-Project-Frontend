import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonLink from "../../components/UI/button-link"; // Import the ButtonLink component to be tested

describe("ButtonLink Component", () => {
  // Test case: Renders the link button with provided href, label, and default styles
  it("renders with the provided label, href and styles", () => {
    const href = "/example"; // Define the href for the link
    const label = "Example Link"; // Define the label for the link

    // Render the ButtonLink component with the provided href and label
    render(<ButtonLink href={href} label={label} />);

    // Find the link button element in the rendered component
    const linkButton = screen.getByText(label);

    // Assertions:
    // Check if the link button is in the document
    expect(linkButton).toBeInTheDocument();
    // Check if the link button has the correct href attribute
    expect(linkButton).toHaveAttribute("href", href);
    // Check for specific CSS classes on the link button to ensure proper styling
    expect(linkButton).toHaveClass("bg-green-700");
    expect(linkButton).toHaveClass("hover:bg-green-600");
    expect(linkButton).toHaveClass("text-gray-200");
    expect(linkButton).toHaveClass("px-6");
    expect(linkButton).toHaveClass("py-3");
    expect(linkButton).toHaveClass("rounded-full");
  });

  // Test case: Renders the link button with provided href, label, and custom className
  it("renders with the provided label, href and custom className", () => {
    const href = "/example"; // Define the href for the link
    const label = "Example Link"; // Define the label for the link
    const className = "custom-class"; // Define a custom class name

    // Render the ButtonLink component with the provided href, label, and className
    render(<ButtonLink href={href} label={label} className={className} />);

    // Find the link button element in the rendered component
    const linkButton = screen.getByText(label);

    // Assertions:
    // Check if the link button is in the document
    expect(linkButton).toBeInTheDocument();
    // Check if the link button has the correct href attribute
    expect(linkButton).toHaveAttribute("href", href);
    // Check if the custom className is applied to the link button
    expect(linkButton).toHaveClass(className);
  });
});
