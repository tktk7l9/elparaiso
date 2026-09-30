import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Cards } from "./index";

describe("Cards", () => {
  it("shows one card per top-page destination, named after the destination", () => {
    render(<Cards />);
    const links = screen.getAllByRole("link");
    expect(links.map((l) => l.getAttribute("href"))).toEqual([
      "/about",
      "/melodies",
      "/projects",
      "https://elparaiso.stores.jp/",
      "/library",
    ]);
    for (const name of ["ABOUT", "MELODIES", "PROJECTS", "LIBRARY"]) {
      expect(screen.getByRole("link", { name })).toBeVisible();
    }
  });

  it("loads the first card eagerly and the rest lazily", () => {
    render(<Cards />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(5);
    expect(images[0]).toHaveAttribute("loading", "eager");
    for (const img of images.slice(1)) expect(img).toHaveAttribute("loading", "lazy");
  });

  it("marks the store card as leaving the site in a new tab", () => {
    render(<Cards />);
    const store = screen.getByRole("link", { name: /^STORE/ });
    expect(store).toHaveAttribute("target", "_blank");
    expect(store).toHaveAttribute("rel", "noopener noreferrer");
    expect(store).toHaveAccessibleName("STORE（外部サイト・新しいタブで開きます）");
    // The visible caption under the image is decorative; the alt already names it.
    expect(store.querySelector('[aria-hidden="true"]')).toHaveTextContent("store");
  });
});
