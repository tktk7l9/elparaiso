import type { Metadata } from 'next'
import { Headline } from 'src/components/Headline'
import { Contact } from 'src/components/Contact'

export const metadata: Metadata = { title: 'contact' }

export default function ContactPage() {
  return (
    <main className="text-center">
      <Headline />
      <Contact />
    </main>
  )
}
