import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EXTERNAL_NOTE } from "src/lib/nav";
import { ExternalMark } from "./index";

describe("ExternalMark", () => {
  it("shows an arrow visually and the note only to screen readers", () => {
    render(
      <a href="https://example.com">
        Example
        <ExternalMark />
      </a>,
    );
    expect(screen.getByText("↗")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText(EXTERNAL_NOTE)).toHaveClass("sr-only");
    expect(screen.getByRole("link")).toHaveAccessibleName(`Example${EXTERNAL_NOTE}`);
  });
});
