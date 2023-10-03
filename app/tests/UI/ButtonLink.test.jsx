import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonLink from "../../components/UI/button-link";

describe("ButtonLink Component", () => {
  it("renders with the provided label, href and styles", () => {
    const href = "/example";
    const label = "Example Link";

    render(<ButtonLink href={href} label={label} />);

    const linkButton = screen.getByText(label);

    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveAttribute("href", href);
    expect(linkButton).toHaveClass("bg-green-700");
    expect(linkButton).toHaveClass("hover:bg-green-600");
    expect(linkButton).toHaveClass("text-gray-200");
    expect(linkButton).toHaveClass("px-6");
    expect(linkButton).toHaveClass("py-3");
    expect(linkButton).toHaveClass("rounded-full");
  });

  it("renders with the provided label, href and custom className", () => {
    const href = "/example";
    const label = "Example Link";
    const className = "custom-class";

    render(<ButtonLink href={href} label={label} className={className} />);

    const linkButton = screen.getByText(label);

    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveAttribute("href", href);
    expect(linkButton).toHaveClass(className);
  });
});
