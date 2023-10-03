import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../components/UI/button";

describe("Button Component", () => {
  it("renders correctly with provided label and styles", () => {
    const label = "Test Button";

    render(<Button label={label} />);

    const button = screen.getByText(label);

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
    expect(button).toHaveClass("bg-yellow-700");
    expect(button).toHaveClass("hover:bg-green-600");
    expect(button).toHaveClass("text-gray-200");
    expect(button).toHaveClass("px-6");
    expect(button).toHaveClass("py-3");
    expect(button).toHaveClass("rounded-full");
  });

  it("renders correctly with provided label and custom className", () => {
    const label = "Test Button";
    const className = "custom-class";

    render(<Button label={label} className={className} />);

    const button = screen.getByText(label);

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
    expect(button).toHaveClass(className);
  });

  it("calls onClick handler when the button is clicked", () => {
    const label = "Test Button";
    const onClickMock = jest.fn();

    render(<Button label={label} onClick={onClickMock} />);

    const button = screen.getByText(label);

    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
