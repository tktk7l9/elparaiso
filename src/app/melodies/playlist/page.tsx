import type { Metadata } from 'next'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Headline } from 'src/components/Headline'
import { PlaylistDetail } from 'src/components/PlaylistDetail'

export const metadata: Metadata = { title: 'playlist' }

export default function PlaylistPage() {
  return (
    <>
      <Header />
      <main className="text-center">
        <Headline />
        <PlaylistDetail />
      </main>
      <Footer />
    </>
  )
}
