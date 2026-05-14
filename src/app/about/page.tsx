import type { Metadata } from 'next'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Headline } from 'src/components/Headline'
import { About } from 'src/components/About'

export const metadata: Metadata = { title: 'about' }

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="text-center">
        <Headline />
        <About />
      </main>
      <Footer />
    </>
  )
}
