import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PLAYLISTS } from "src/lib/playlists";
import { PlaylistDetail } from "./index";

const playlist = PLAYLISTS[0];

describe("PlaylistDetail", () => {
  it("embeds the Spotify player in a sandboxed iframe titled after the playlist", () => {
    render(<PlaylistDetail playlist={playlist} />);
    const frame = screen.getByTitle(`Spotify ${playlist.title}`);
    expect(frame.tagName).toBe("IFRAME");
    expect(frame).toHaveAttribute("src", playlist.embedUrl);
    expect(frame).toHaveAttribute("sandbox", expect.stringContaining("allow-scripts"));
    expect(frame).toHaveAttribute("loading", "lazy");
  });

  it("always offers a link-out to Spotify in case the embed does not load", () => {
    render(<PlaylistDetail playlist={playlist} />);
    const link = screen.getByRole("link", { name: /^Spotifyで聴く/ });
    expect(link).toHaveAttribute("href", playlist.openUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAccessibleName("Spotifyで聴く（外部サイト・新しいタブで開きます）");
    expect(screen.getByRole("img", { name: playlist.title })).toBeVisible();
    // The detail view has no self-link on the cover.
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });
});
