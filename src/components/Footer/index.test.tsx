import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./index";

describe("Footer", () => {
  it("lists the social and store links as a list with a heading line", () => {
    render(<Footer />);
    expect(screen.getByText("Culture & Policy")).toBeVisible();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("opens external links in a new tab with a screen-reader note", () => {
    render(<Footer />);
    for (const [name, href] of [
      ["Instagram", "https://www.instagram.com/elparaisojp/"],
      ["Store", "https://elparaiso.stores.jp/"],
      ["Spotify", "https://open.spotify.com/playlist/1jnkrS9FUGTzZ6nIOuZ0xE?si=70f4ef6442fb48f2"],
    ]) {
      const link = screen.getByRole("link", { name: new RegExp(`^${name}`) });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAccessibleName(`${name}（外部サイト・新しいタブで開きます）`);
    }
  });

  it("keeps Contact as an in-site link without the external note", () => {
    render(<Footer />);
    const contact = screen.getByRole("link", { name: "Contact" });
    expect(contact).toHaveAttribute("href", "/contact");
    expect(contact).not.toHaveAttribute("target");
  });
});
