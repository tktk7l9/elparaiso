/** @type {import('next').NextConfig} */

const securityHeaders = [
  // クリックジャッキング対策: 同一オリジンのフレームのみ許可
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // MIME スニッフィング対策
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // リファラ情報の制限
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // 不要なブラウザ機能を無効化
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
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
