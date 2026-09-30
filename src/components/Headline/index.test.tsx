import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Headline } from "./index";

describe("Headline", () => {
  it("wraps the logo in a link back to the top page", () => {
    render(<Headline />);
    const link = screen.getByRole("link", { name: "EL PARAISO logo" });
    expect(link).toHaveAttribute("href", "/");
    expect(screen.getByRole("img", { name: "EL PARAISO logo" })).toBeVisible();
  });
});
