/** @type {import('next').NextConfig} */

// CSP:
//   - 'unsafe-inline' in script-src is the baseline for next dev / next start, because Next writes
//     its RSC payload as inline <script>. In production every HTML response goes through the
//     Worker entry (worker.ts), which replaces it with a per-request nonce and stamps that nonce
//     on each inline <script> (src/lib/csp-nonce.ts). Never add 'strict-dynamic': it would make
//     'self' (the /_next/static chunks) and the beacon host be ignored, and those carry no nonce.
//   - 'unsafe-inline' in style-src stays: inlined CSS (experimental.inlineCss) + Tailwind v4
//   - img-src allows only the site's own images (every next/image points at /images/*); a remote
//     host would also have to go into images.remotePatterns, which makes /_next/image?url=...
//     fetch that host through this Worker for anyone who asks
//   - connect-src allows only the site itself and the Cloudflare Web Analytics beacon;
//     the site has no backend API, so no other origin may receive data from a script
//   - frame-src allows only the Spotify playlist embed on /melodies
//   - 'unsafe-eval' is only for next dev (React debugging); production bundles never eval
const isDev = process.env.NODE_ENV !== 'production'
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://cloudflareinsights.com",
  "worker-src 'self' blob:",
  "frame-src https://open.spotify.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // Redundant with CSP frame-ancestors, but kept for older browsers
  { key: 'X-Frame-Options', value: 'DENY' },
  // Prevent MIME sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Limit referrer information
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Own browsing-context group: a page opened from here (or one that opens us) gets no handle
  // on this window. The site opens no popups it needs to talk to (external links already use
  // noopener) and the Spotify iframe is unaffected. Same as the sibling sites; Observatory +10.
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  // Disable browser features we do not need
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // HSTS (Workers does not add it by itself, so set it explicitly)
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

module.exports = {
  experimental: {
    inlineCss: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
