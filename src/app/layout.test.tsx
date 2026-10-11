import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import RootLayout, { metadata } from "./layout";
import { siteUrl } from "src/lib/site";

// The layout renders <html>; jsdom's document cannot host a second one, so
// it is rendered to markup and parsed as a whole document.
vi.mock("next/navigation", () => ({ usePathname: () => "/about" }));

function renderLayout() {
  const html = renderToStaticMarkup(
    <RootLayout>
      <p>page body</p>
    </RootLayout>,
  );
  return new DOMParser().parseFromString(html, "text/html");
}

describe("root layout", () => {
  it("declares the site metadata with the canonical base URL", () => {
    expect(String(metadata.metadataBase)).toBe(`${siteUrl}/`);
    expect(metadata.title).toEqual({ template: "%s - EL PARAISO", default: "EL PARAISO" });
    expect(metadata.openGraph?.url).toBe(siteUrl);
    expect(metadata.openGraph).toMatchObject({ locale: "ja_JP", siteName: "EL PARAISO" });
  });

  it("wraps every page in Japanese html with the shared header and footer", () => {
    const doc = renderLayout();
    expect(doc.documentElement.lang).toBe("ja");
    expect(doc.querySelector("nav[aria-label='メイン']")).not.toBeNull();
    expect(doc.querySelector("nav a[aria-current='page']")?.textContent).toBe("about");
    expect(doc.querySelector("footer")?.textContent).toContain("Culture & Policy");
    expect(doc.body.textContent).toContain("page body");
  });

  it("writes no script into the server HTML (the analytics beacon is appended after hydration)", () => {
    // An external <script src> in the markup without `integrity` costs the Observatory SRI test;
    // src/components/Analytics adds the beacon on the client instead.
    expect(renderLayout().querySelectorAll("script")).toHaveLength(0);
  });
});
