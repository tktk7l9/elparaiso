import type { Metadata } from 'next'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Headline } from 'src/components/Headline'
import { Contact } from 'src/components/Contact'

export const metadata: Metadata = { title: 'contact' }

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="text-center">
        <Headline />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
