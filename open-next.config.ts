import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Every route is prerendered and neither ISR nor on-demand revalidation is used, so no
// incremental cache (R2 etc.) is needed. The defaults are fine.
// https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig();
