import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { siteUrl } from '../lib/site'
import '../styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s - EL PARAISO',
    default: 'EL PARAISO',
  },
  description: '2021年より発足したコミュニティブランド。染め・プリント・グラフィックデザインで日々の感情や情景をプロダクトに反映。',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'EL PARAISO',
    title: 'EL PARAISO',
    description: '2021年より発足したコミュニティブランド。染め・プリント・グラフィックデザインで日々の感情や情景をプロダクトに反映。',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EL PARAISO',
    description: '2021年より発足したコミュニティブランド。染め・プリント・グラフィックデザインで日々の感情や情景をプロダクトに反映。',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {children}
        {/* Cloudflare Web Analytics（トークンは公開前提の識別子。秘密ではない） */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts --
            type="module" のスクリプトは仕様上 defer されるため、パーサーを止めない */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={'{"token": "cd156fbf0fd24da0a12e58fdb4e63828"}'}
        />
      </body>
    </html>
  )
}
