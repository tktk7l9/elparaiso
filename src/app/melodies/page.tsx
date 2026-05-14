import type { Metadata } from 'next'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Headline } from 'src/components/Headline'
import { Spotify } from 'src/components/Spotify'

export const metadata: Metadata = { title: 'melodies' }

export default function Melodies() {
  return (
    <>
      <Header />
      <main className="text-center">
        <Headline />
        <Spotify />
      </main>
      <Footer />
    </>
  )
}
