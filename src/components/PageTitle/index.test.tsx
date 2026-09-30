import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageTitle } from "./index";

describe("PageTitle", () => {
  it("renders the page name as the level-1 heading", () => {
    render(<PageTitle>about</PageTitle>);
    const h1 = screen.getByRole("heading", { level: 1, name: "about" });
    expect(h1).not.toHaveClass("sr-only");
  });

  it("can hide the heading visually while keeping it for assistive tech", () => {
    render(<PageTitle visuallyHidden>EL PARAISO</PageTitle>);
    expect(screen.getByRole("heading", { level: 1, name: "EL PARAISO" })).toHaveClass("sr-only");
  });
});
