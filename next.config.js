/** @type {import('next').NextConfig} */

// CSP:
//   - script/style に 'unsafe-inline' は Next.js (RSC inline payload + Tailwind v4) の要件
//   - img-src で remote の Spotify/Imageflux をホスト指定で許可
//   - connect-src で Supabase REST/Realtime を許可
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://spotify.com https://p1-e6eeae93.imageflux.jp https://i.scdn.co",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // CSP の frame-ancestors と冗長だが古いブラウザ向けに残す
  { key: 'X-Frame-Options', value: 'DENY' },
  // MIME スニッフィング対策
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // リファラ情報の制限
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // 不要なブラウザ機能を無効化
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // HSTS (Vercel ではデフォルトで付くが明示)
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
