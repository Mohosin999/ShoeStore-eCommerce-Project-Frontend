import React from "react";
import { render, screen } from "@testing-library/react";
import Heading from "../../components/UI/heading"; // Import the Heading component to be tested

describe("Heading Component", () => {
  // Test case: Renders the heading with provided name and default styles
  it("renders correctly with provided name and styles", () => {
    const name = "Mohosin Hasan"; // Define the name to be displayed

    // Render the Heading component with the provided name
    render(<Heading name={name} />);

    // Find the heading element in the rendered component
    const headingElement = screen.getByText(name);

    // Assertions:
    // Check if the heading is in the document
    expect(headingElement).toBeInTheDocument();
    // Check if the heading text content matches the provided name
    expect(headingElement).toHaveTextContent(name);
    // Check for specific CSS classes on the heading to ensure proper styling
    expect(headingElement).toHaveClass("text-xl");
    expect(headingElement).toHaveClass("text-green-400");
    expect(headingElement).toHaveClass("font-bold");
    expect(headingElement).toHaveClass("mb-2");
  });

  // Test case: Renders the heading with provided name and custom className
  it("renders with the provided name and custom className", () => {
    const name = "Mohosin Hasan"; // Define the name to be displayed
    const className = "custom-class"; // Define a custom class name

    // Render the Heading component with the provided name and className
    render(<Heading name={name} className={className} />);

    // Find the heading element in the rendered component
    const headingElement = screen.getByText(name);

    // Assertions:
    // Check if the heading is in the document
    expect(headingElement).toBeInTheDocument();
    // Check if the heading text content matches the provided name
    expect(headingElement).toHaveTextContent(name);
    // Check if the custom className is applied to the heading
    expect(headingElement).toHaveClass(className);
  });
});
