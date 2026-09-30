import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Playlist } from "./index";

const props = { src: "/images/melodies/playlist0001.webp", title: "CURATED MELODIES #1" };

describe("Playlist", () => {
  it("links the cover to the given page and captions it with the title", () => {
    render(<Playlist {...props} href="/melodies/playlist" />);
    const link = screen.getByRole("link", { name: props.title });
    expect(link).toHaveAttribute("href", "/melodies/playlist");
    expect(screen.getByText(props.title)).toBeVisible();
  });

  it("renders the cover without a link when no href is given", () => {
    render(<Playlist {...props} />);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByRole("img", { name: props.title })).toBeVisible();
    expect(screen.getByText(props.title)).toBeVisible();
  });
});
