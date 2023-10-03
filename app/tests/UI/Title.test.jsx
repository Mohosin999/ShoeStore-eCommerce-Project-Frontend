import React from "react";
import { render, screen } from "@testing-library/react";
import Title from "../../components/UI/title"; // Import the Title component to be tested

describe("Title Component", () => {
  // Test case: Renders the title with provided title and default styles
  it("renders correctly with provided title and styles", () => {
    const title = "Test Title"; // Define the title text

    // Render the Title component with the provided title
    render(<Title title={title} />);

    // Find the title element in the rendered component
    const titleElement = screen.getByText(title);

    // Assertions:
    // Check if the title is in the document
    expect(titleElement).toBeInTheDocument();
    // Check if the title text content matches the provided title
    expect(titleElement).toHaveTextContent(title);
    // Check for specific CSS classes on the title to ensure proper styling
    expect(titleElement).toHaveClass("text-3xl");
    expect(titleElement).toHaveClass("text-orange-400");
    expect(titleElement).toHaveClass("font-bold");
    expect(titleElement).toHaveClass("mb-6");
  });

  // Test case: Renders the title with provided title and custom className
  it("renders correctly with provided title and custom className", () => {
    const title = "Test Title"; // Define the title text
    const className = "custom-class"; // Define a custom class name

    // Render the Title component with the provided title and className
    render(<Title title={title} className={className} />);

    // Find the title element in the rendered component
    const titleElement = screen.getByText(title);

    // Assertions:
    // Check if the title is in the document
    expect(titleElement).toBeInTheDocument();
    // Check if the title text content matches the provided title
    expect(titleElement).toHaveTextContent(title);
    // Check if the custom className is applied to the title
    expect(titleElement).toHaveClass(className);
  });
});
