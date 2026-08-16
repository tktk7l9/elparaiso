import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// 全ルートが静的で ISR も on-demand revalidate も使わないため、
// インクリメンタルキャッシュ（R2 等）は不要。既定のままでよい。
// https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig();
