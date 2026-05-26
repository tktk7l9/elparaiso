import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import '../styles/globals.css'
import { GA_TRACKING_ID } from 'src/libs/gtag'
import { GoogleAnalytics } from './GoogleAnalytics'

export const metadata: Metadata = {
  metadataBase: new URL('https://elparaiso.vercel.app'),
  title: {
    template: '%s - EL PARAISO',
    default: 'EL PARAISO',
  },
  description: '2021年より発足したコミュニティブランド。染め・プリント・グラフィックデザインで日々の感情や情景をプロダクトに反映。',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    url: 'https://elparaiso.vercel.app',
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
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', { send_page_view: false });
            `}</Script>
          </>
        )}
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
