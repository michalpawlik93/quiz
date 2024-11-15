import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "../button";
import { mockUseFormStatus } from "@/__fixtures__/useFormStatus";

jest.mock("react-dom", () => ({
  __esModule: true,
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
}));

describe("Button component", () => {
  beforeEach(() => {
    mockUseFormStatus();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders the button with label", () => {
    render(<Button label="Click Me" />);
    const buttonElement = screen.getByRole("button", { name: "Click Me" });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toBeDisabled();
  });

  it("disable the button when `pending` is true", () => {
    mockUseFormStatus({
      pending: true,
    });
    render(<Button label="Click Me" />);
    const buttonElement = screen.getByRole("button", { name: "Click Me" });
    expect(buttonElement).toBeDisabled();
  });

  it("passes additional props to the button element", () => {
    render(<Button label="Click Me" data-testid="custom-button" />);
    const buttonElement = screen.getByTestId("custom-button");
    expect(buttonElement).toBeInTheDocument();
  });
});
