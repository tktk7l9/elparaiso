import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LibraryItems } from "./index";

describe("LibraryItems", () => {
  it("shows every library photo with a numbered Japanese alt text", () => {
    render(<LibraryItems />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(13);
    expect(images[0]).toHaveAccessibleName("EL PARAISO ライブラリ写真 1");
    expect(images[12]).toHaveAccessibleName("EL PARAISO ライブラリ写真 13");
    expect(screen.getByRole("article").querySelectorAll("figure")).toHaveLength(13);
  });

  it("loads only the first photo eagerly", () => {
    render(<LibraryItems />);
    const [first, ...rest] = screen.getAllByRole("img");
    expect(first).toHaveAttribute("loading", "eager");
    for (const img of rest) expect(img).toHaveAttribute("loading", "lazy");
  });
});
