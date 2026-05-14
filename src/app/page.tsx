import type { Metadata } from 'next'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Headline } from 'src/components/Headline'
import { Cards } from 'src/components/Cards'

export const metadata: Metadata = { title: { absolute: 'EL PARAISO' } }

export default function Home() {
  return (
    <>
      <Header />
      <main className="text-center">
        <Headline />
        <Cards />
      </main>
      <Footer />
    </>
  )
}
