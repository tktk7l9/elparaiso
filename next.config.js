/** @type {import('next').NextConfig} */

// CSP:
//   - 'unsafe-inline' in script/style is required by Next.js (RSC inline payload + Tailwind v4)
//   - img-src allows the remote Spotify/Imageflux hosts by name
//   - connect-src allows Supabase REST/Realtime
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://spotify.com https://p1-e6eeae93.imageflux.jp https://i.scdn.co",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://cloudflareinsights.com",
  "worker-src 'self' blob:",
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
  // Disable browser features we do not need
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // HSTS (Vercel adds it by default, but set it explicitly)
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
  images: {
    remotePatterns: [
      { hostname: "spotify.com" },
      { hostname: "p1-e6eeae93.imageflux.jp" },
    ],
  },
}
