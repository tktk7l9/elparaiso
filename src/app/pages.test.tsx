import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home, { metadata as homeMetadata } from "./page";
import AboutPage, { metadata as aboutMetadata } from "./about/page";
import ContactPage, { metadata as contactMetadata } from "./contact/page";
import Library, { metadata as libraryMetadata } from "./library/page";
import Melodies, { metadata as melodiesMetadata } from "./melodies/page";
import PlaylistPage, { metadata as playlistMetadata } from "./melodies/playlist/page";
import Projects, { metadata as projectsMetadata } from "./projects/page";
import Store, { metadata as storeMetadata } from "./store/page";
import NotFound from "./not-found";
import Loading from "./loading";

const logo = () => screen.getByRole("link", { name: "EL PARAISO logo" });

describe("top page", () => {
  it("uses the bare site name as title and shows the cards under a hidden h1", () => {
    expect(homeMetadata.title).toEqual({ absolute: "EL PARAISO" });
    render(<Home />);
    expect(screen.getByRole("main")).toBeVisible();
    expect(screen.getByRole("heading", { level: 1, name: "EL PARAISO" })).toHaveClass("sr-only");
    expect(screen.getByRole("link", { name: "ABOUT" })).toHaveAttribute("href", "/about");
    expect(logo()).toHaveAttribute("href", "/");
  });
});

describe("content pages", () => {
  it.each([
    ["about", AboutPage, aboutMetadata, () => screen.getByText(/2021年より発足/)],
    ["contact", ContactPage, contactMetadata, () => screen.getByRole("button", { name: "Submit" })],
    ["library", Library, libraryMetadata, () => screen.getByRole("img", { name: /ライブラリ写真 13$/ })],
    ["melodies", Melodies, melodiesMetadata, () => screen.getByRole("link", { name: /^Spotifyで聴く/ })],
    ["projects", Projects, projectsMetadata, () => screen.getByText("projects page is coming soon")],
    ["store", Store, storeMetadata, () => screen.getByText("store page is coming soon")],
  ] as const)("/%s sets its title and renders its content", (name, Page, metadata, content) => {
    expect(metadata.title).toBe(name);
    render(<Page />);
    expect(screen.getByRole("main")).toBeVisible();
    expect(logo()).toHaveAttribute("href", "/");
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(content()).toBeInTheDocument();
  });

  it("/melodies/playlist shows the first playlist with its player", () => {
    expect(playlistMetadata.title).toBe("playlist");
    render(<PlaylistPage />);
    expect(screen.getByRole("heading", { level: 1, name: "melodies" })).toBeVisible();
    expect(screen.getByTitle("Spotify CURATED MELODIES #1")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Spotifyで聴く/ })).toBeVisible();
  });
});

describe("not-found and loading", () => {
  it("404 explains the miss and offers a way home", () => {
    render(<NotFound />);
    expect(screen.getByRole("main")).toBeVisible();
    expect(screen.getByRole("heading", { level: 1, name: "404" })).toBeVisible();
    expect(screen.getByText("ページが見つかりませんでした")).toBeVisible();
    expect(screen.getByRole("link", { name: "ホームへ戻る" })).toHaveAttribute("href", "/");
  });

  it("loading shows a text placeholder", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeVisible();
  });
});
