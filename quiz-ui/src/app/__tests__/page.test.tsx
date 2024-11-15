import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../page";

describe("Page", () => {
  it("renders Home page", () => {
    render(<Page />);

    const heading = screen.getByText("Hello from home");

    expect(heading).toBeInTheDocument();
  });
});
