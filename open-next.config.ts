import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every route is prerendered at build time; neither ISR nor on-demand revalidation is used.
//
// An incremental cache is still required to *serve* that output: with the "dummy" default
// OpenNext cannot read it, so the Worker re-rendered every page on every request
// (`x-nextjs-cache: MISS`) and each next/link prefetch cost another render.
//
// The static assets cache serves the build output instead: `opennextjs-cloudflare deploy` /
// `preview` copy it under cdn-cgi/_next_cache/ (reachable only from the Worker). It is
// read-only, which fits a site with no revalidation. Cache interception answers cached routes
// in the routing layer, without loading the Next server or rendering React; the HTML still
// leaves through worker.ts, so each response gets its own nonce. It does not work with PPR.
// src/lib/open-next-config.test.ts keeps both settings.
// https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
