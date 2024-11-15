import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../input";

describe("Input component", () => {
  it("renders the input element", () => {
    render(<Input label="Test Label" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("passes additional props to the input element", () => {
    render(<Input label="Test Label" placeholder="Type here..." />);
    const inputElement = screen.getByPlaceholderText("Type here...");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls onChange when the input value changes", () => {
    const handleChange = jest.fn();
    render(<Input label="Test Label" onChange={handleChange} />);
    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "New value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
