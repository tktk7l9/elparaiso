import type { Metadata } from 'next'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Headline } from 'src/components/Headline'

export const metadata: Metadata = { title: 'projects' }

export default function Projects() {
  return (
    <>
      <Header />
      <main className="text-center">
        <Headline />
        <div className="pt-10 pb-64 lg:pb-96 lg:text-2xl animate-fade-in">
          projects page is coming soon
        </div>
      </main>
      <Footer />
    </>
  )
}
