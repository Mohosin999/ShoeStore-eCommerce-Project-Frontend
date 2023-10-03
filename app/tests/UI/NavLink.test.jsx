import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavLink from "../../components/UI/nav-link"; // Import the NavLink component to be tested

describe("NavLink Component", () => {
  // Test case: Renders the link with provided href, label, and default styles
  it("renders correctly with provided href, label, and styles", () => {
    const href = "/test"; // Define the href for the link
    const label = "Test Link"; // Define the label for the link

    // Render the NavLink component with the provided href and label
    render(<NavLink href={href} label={label} />);

    // Find the link element in the rendered component
    const link = screen.getByText(label);

    // Assertions:
    // Check if the link is in the document
    expect(link).toBeInTheDocument();
    // Check if the link has the correct href attribute
    expect(link).toHaveAttribute("href", href);
    // Check for specific CSS classes on the link to ensure proper styling
    expect(link).toHaveClass("text-gray-200");
    expect(link).toHaveClass("hover:bg-green-700");
    expect(link).toHaveClass("px-4");
    expect(link).toHaveClass("py-2");
    expect(link).toHaveClass("rounded-full");
  });

  // Test case: Calls onMouseEnter and onMouseLeave handlers when hovering
  it("calls onMouseEnter and onMouseLeave handlers when hovering", () => {
    const onMouseEnter = jest.fn(); // Create a mock function for onMouseEnter
    const onMouseLeave = jest.fn(); // Create a mock function for onMouseLeave

    const href = "/test"; // Define the href for the link
    const label = "Test Link"; // Define the label for the link

    // Render the NavLink component with the provided href, label, and event handlers
    render(
      <NavLink
        href={href}
        label={label}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    const link = screen.getByText(label);

    // Simulate mouse enter and mouse leave events on the link
    fireEvent.mouseEnter(link);
    fireEvent.mouseLeave(link);

    // Assertions:
    // Check if the onMouseEnter and onMouseLeave handlers were called once each
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  // Test case: Displays subMenuComponent when showSubMenu is true
  it("displays subMenuComponent when showSubMenu is true", () => {
    const href = "/test"; // Define the href for the link
    const label = "Test Link"; // Define the label for the link
    const subMenuComponent = <div>Submenu Content</div>; // Define the submenu content

    // Render the NavLink component with showSubMenu set to true and subMenuComponent
    render(
      <NavLink
        href={href}
        label={label}
        showSubMenu={true}
        subMenuComponent={subMenuComponent}
      />
    );

    const link = screen.getByText(label);
    const subMenuContent = screen.getByText("Submenu Content");

    // Assertions:
    // Check if the link and submenu content are in the document
    expect(link).toBeInTheDocument();
    expect(subMenuContent).toBeInTheDocument();
  });
});
