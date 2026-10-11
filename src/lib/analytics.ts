// Cloudflare Web Analytics. Client-side module (src/components/Analytics imports it), so keep it
// free of node: imports. next.config.js allows this script origin and the POST target in its
// CSP; analytics.test.ts keeps them in sync.
export const BEACON_SRC = 'https://static.cloudflareinsights.com/beacon.min.js'

/**
 * Site token. It is sent from every page and visible to every visitor, so it is not a secret.
 * gitleaks flags 32-hex-digit strings as generic-api-key, so gitleaks:allow is placed on the
 * flagged line (a config file would also hide other, real secrets).
 */
export const BEACON_TOKEN = 'cd156fbf0fd24da0a12e58fdb4e63828' // gitleaks:allow
