"use client";

import { useEffect } from "react";
import { BEACON_SRC, BEACON_TOKEN } from "src/lib/analytics";

/**
 * Cloudflare Web Analytics. The beacon is appended after hydration instead of being a
 * <script src> in the HTML, so the markup carries no external script without `integrity`
 * (Observatory subresource-integrity). SRI cannot be pinned: Cloudflare swaps the content behind
 * the unversioned beacon.min.js URL, so an `integrity` attribute would silently stop the beacon
 * on its next update. The script needs no nonce either: script-src allows its origin.
 */
export const Analytics = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (document.querySelector(`script[src="${BEACON_SRC}"]`)) return;
    const beacon = document.createElement("script");
    beacon.type = "module";
    beacon.src = BEACON_SRC;
    beacon.dataset.cfBeacon = JSON.stringify({ token: BEACON_TOKEN });
    document.body.appendChild(beacon);
  }, []);
  return null;
};
