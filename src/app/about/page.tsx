import type { Metadata } from 'next'
import { Headline } from 'src/components/Headline'
import { PageTitle } from 'src/components/PageTitle'
import { About } from 'src/components/About'

export const metadata: Metadata = { title: 'about' }

export default function AboutPage() {
  return (
    <main className="text-center">
      <Headline />
      <PageTitle>about</PageTitle>
      <About />
    </main>
  )
}
