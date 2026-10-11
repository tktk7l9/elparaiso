import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { BEACON_SRC, BEACON_TOKEN } from "src/lib/analytics";
import { Analytics } from "./index";

const beacons = () => document.querySelectorAll<HTMLScriptElement>(`script[src="${BEACON_SRC}"]`);

afterEach(() => {
  vi.unstubAllEnvs();
  for (const el of beacons()) el.remove();
});

describe("Analytics", () => {
  it("writes nothing into the server HTML", () => {
    expect(renderToStaticMarkup(<Analytics />)).toBe("");
  });

  it("appends the beacon after hydration in production, with the site token and no SRI", () => {
    vi.stubEnv("NODE_ENV", "production");
    const { container } = render(<Analytics />);

    expect(container).toBeEmptyDOMElement();
    const [beacon, ...rest] = beacons();
    expect(rest).toHaveLength(0);
    expect(beacon.type).toBe("module");
    expect(JSON.parse(beacon.dataset.cfBeacon ?? "")).toEqual({ token: BEACON_TOKEN });
    // Cloudflare updates beacon.min.js in place; a pinned hash would block it silently.
    expect(beacon).not.toHaveAttribute("integrity");
    expect(beacon.parentElement).toBe(document.body);
  });

  it("adds the beacon only once per page", () => {
    vi.stubEnv("NODE_ENV", "production");
    render(<Analytics />);
    render(<Analytics />);
    expect(beacons()).toHaveLength(1);
  });

  it("stays silent outside production builds", () => {
    vi.stubEnv("NODE_ENV", "development");
    render(<Analytics />);
    expect(beacons()).toHaveLength(0);
  });
});
