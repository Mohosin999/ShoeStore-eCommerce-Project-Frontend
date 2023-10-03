import React from "react";
import { render, screen } from "@testing-library/react";
import Heading from "../../components/UI/heading";

describe("Heading Component", () => {
  it("renders correctly with provided name and styles", () => {
    const name = "Mohosin Hasan";

    render(<Heading name={name} />);

    const button = screen.getByText(name);

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(name);
    expect(button).toHaveClass("text-xl");
    expect(button).toHaveClass("text-green-400");
    expect(button).toHaveClass("font-bold");
    expect(button).toHaveClass("mb-2");
  });

  it("renders with the provided name and custom className", () => {
    const name = "Mohosin Hasan";
    const className = "custom-class";

    render(<Heading name={name} className={className} />);

    const headingElement = screen.getByText(name);

    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(name);
    expect(headingElement).toHaveClass(className);
  });
});
