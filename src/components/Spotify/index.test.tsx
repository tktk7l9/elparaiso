import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { PlaylistData } from "src/lib/playlists";

const one: PlaylistData = {
  title: "CURATED MELODIES #1",
  src: "/images/melodies/playlist0001.webp",
  embedUrl: "https://open.spotify.com/embed/playlist/1",
  openUrl: "https://open.spotify.com/playlist/1",
};
const two: PlaylistData = { ...one, title: "CURATED MELODIES #2" };

const state = vi.hoisted(() => ({ playlists: [] as PlaylistData[] }));
vi.mock("src/lib/playlists", async (importOriginal) => {
  const actual = await importOriginal<typeof import("src/lib/playlists")>();
  return { ...actual, PLAYLISTS: state.playlists };
});

import { Spotify } from "./index";

describe("Spotify (melodies view)", () => {
  it("shows a single playlist directly with its player, skipping the list", () => {
    state.playlists.splice(0, state.playlists.length, one);
    render(<Spotify />);
    expect(screen.getByTitle(`Spotify ${one.title}`)).toBeInTheDocument();
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("lists several playlists, each linking to the playlist page", () => {
    state.playlists.splice(0, state.playlists.length, one, two);
    render(<Spotify />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAttribute("href", "/melodies/playlist");
    }
    expect(screen.getByText(two.title)).toBeVisible();
    expect(screen.queryByTitle(/^Spotify /)).toBeNull();
  });

  it("renders nothing when there are no playlists", () => {
    state.playlists.splice(0, state.playlists.length);
    const { container } = render(<Spotify />);
    expect(container).toBeEmptyDOMElement();
  });
});
