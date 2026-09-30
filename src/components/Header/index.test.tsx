import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { NAV_ITEMS } from "src/lib/nav";
import { Header } from "./index";

const { pathname } = vi.hoisted(() => ({ pathname: { current: "/" as string | null } }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

describe("Header", () => {
  it("lists every nav item inside the main navigation", () => {
    pathname.current = "/";
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "メイン" });
    for (const item of NAV_ITEMS) {
      expect(within(nav).getByRole("link", { name: new RegExp(`^${item.label}`) })).toBeVisible();
    }
    expect(within(nav).getAllByRole("listitem")).toHaveLength(NAV_ITEMS.length);
  });

  it("marks the page being shown, including nested paths, with aria-current", () => {
    pathname.current = "/melodies/playlist";
    render(<Header />);
    const current = screen.getByRole("link", { current: "page" });
    expect(current).toHaveTextContent("melodies");
    expect(current).toHaveAttribute("href", "/melodies");
    expect(screen.getByRole("link", { name: "about" })).not.toHaveAttribute("aria-current");
  });

  it("marks nothing as current on the top page", () => {
    pathname.current = "/";
    render(<Header />);
    expect(screen.queryByRole("link", { current: "page" })).toBeNull();
  });

  it("opens the store in a new tab and says so for screen readers", () => {
    pathname.current = "/store";
    render(<Header />);
    const store = screen.getByRole("link", { name: /^store/ });
    expect(store).toHaveAttribute("href", "https://elparaiso.stores.jp/");
    expect(store).toHaveAttribute("target", "_blank");
    expect(store).toHaveAttribute("rel", "noopener noreferrer");
    expect(store).toHaveAccessibleName("store（外部サイト・新しいタブで開きます）");
    // An external URL is never "current", even when the pathname looks similar.
    expect(store).not.toHaveAttribute("aria-current");
  });
});
