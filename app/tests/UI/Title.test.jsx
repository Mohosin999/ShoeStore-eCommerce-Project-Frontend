import React from "react";
import { render, screen } from "@testing-library/react";
import Title from "../../components/UI/title";

describe("Title Component", () => {
  it("renders correctly with provided title and styles", () => {
    const title = "Test Title";

    render(<Title title={title} />);

    const titleElement = screen.getByText(title);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);
    expect(titleElement).toHaveClass("text-3xl");
    expect(titleElement).toHaveClass("text-orange-400");
    expect(titleElement).toHaveClass("font-bold");
    expect(titleElement).toHaveClass("mb-6");
  });

  it("renders correctly with provided title and custom className", () => {
    const title = "Test Title";
    const className = "custom-class";

    render(<Title title={title} className={className} />);

    const titleElement = screen.getByText(title);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);
    expect(titleElement).toHaveClass(className);
  });
});
