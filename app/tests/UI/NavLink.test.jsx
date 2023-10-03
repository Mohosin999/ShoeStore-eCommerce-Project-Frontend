import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavLink from "../../components/UI/nav-link";

describe("NavLink Component", () => {
  it("renders correctly with provided href, label, and styles", () => {
    const href = "/test";
    const label = "Test Link";

    render(<NavLink href={href} label={label} />);

    const link = screen.getByText(label);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveClass("text-gray-200");
    expect(link).toHaveClass("hover:bg-green-700");
    expect(link).toHaveClass("px-4");
    expect(link).toHaveClass("py-2");
    expect(link).toHaveClass("rounded-full");
  });

  it("calls onMouseEnter and onMouseLeave handlers when hovering", () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const href = "/test";
    const label = "Test Link";

    render(
      <NavLink
        href={href}
        label={label}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    const link = screen.getByText(label);

    fireEvent.mouseEnter(link);
    fireEvent.mouseLeave(link);

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it("displays subMenuComponent when showSubMenu is true", () => {
    const href = "/test";
    const label = "Test Link";
    const subMenuComponent = <div>Submenu Content</div>;

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

    expect(link).toBeInTheDocument();
    expect(subMenuContent).toBeInTheDocument();
  });
});
