import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { siteUrl } from '../lib/site'
import { Analytics } from '../components/Analytics'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
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
      <body className="flex min-h-screen flex-col">
        {/* Header and footer live here so 404 and error pages keep the way home. */}
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        {/* Cloudflare Web Analytics, appended after hydration rather than written into the HTML */}
        <Analytics />
      </body>
    </html>
  )
}
