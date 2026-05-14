import type { Metadata } from 'next'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Headline } from 'src/components/Headline'
import { LibraryItems } from 'src/components/LibraryItems'

export const metadata: Metadata = { title: 'library' }

export default function Library() {
  return (
    <>
      <Header />
      <main className="text-center">
        <Headline />
        <LibraryItems />
      </main>
      <Footer />
    </>
  )
}
