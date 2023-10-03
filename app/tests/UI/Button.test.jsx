import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../components/UI/button"; // Import the Button component to be tested

describe("Button Component", () => {
  // Test case: Renders the button with provided label and default styles
  it("renders correctly with provided label and styles", () => {
    const label = "Test Button"; // Define the label for the button

    // Render the Button component with the provided label
    render(<Button label={label} />);

    // Find the button element in the rendered component
    const button = screen.getByText(label);

    // Assertions:
    // Check if the button is in the document
    expect(button).toBeInTheDocument();
    // Check if the button text content matches the provided label
    expect(button).toHaveTextContent(label);
    // Check for specific CSS classes on the button to ensure proper styling
    expect(button).toHaveClass("bg-yellow-700");
    expect(button).toHaveClass("hover:bg-green-600");
    expect(button).toHaveClass("text-gray-200");
    expect(button).toHaveClass("px-6");
    expect(button).toHaveClass("py-3");
    expect(button).toHaveClass("rounded-full");
  });

  // Test case: Renders the button with provided label and custom className
  it("renders correctly with provided label and custom className", () => {
    const label = "Test Button"; // Define the label for the button
    const className = "custom-class"; // Define a custom class name

    // Render the Button component with the provided label and className
    render(<Button label={label} className={className} />);

    // Find the button element in the rendered component
    const button = screen.getByText(label);

    // Assertions:
    // Check if the button is in the document
    expect(button).toBeInTheDocument();
    // Check if the button text content matches the provided label
    expect(button).toHaveTextContent(label);
    // Check if the custom className is applied to the button
    expect(button).toHaveClass(className);
  });

  // Test case: Calls the onClick handler when the button is clicked
  it("calls onClick handler when the button is clicked", () => {
    const label = "Test Button"; // Define the label for the button
    const onClickMock = jest.fn(); // Create a mock function to track click events

    // Render the Button component with the provided label and onClick handler
    render(<Button label={label} onClick={onClickMock} />);

    // Find the button element in the rendered component
    const button = screen.getByText(label);

    // Simulate a click event on the button
    fireEvent.click(button);

    // Assertion:
    // Check if the onClickMock function was called once
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
