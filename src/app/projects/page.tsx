import type { Metadata } from 'next'
import { Headline } from 'src/components/Headline'
import { PageTitle } from 'src/components/PageTitle'

export const metadata: Metadata = { title: 'projects' }

export default function Projects() {
  return (
    <main className="text-center">
      <Headline />
      <PageTitle>projects</PageTitle>
      <div className="pt-10 pb-64 lg:pb-96 lg:text-2xl motion-safe:animate-fade-in">
        projects page is coming soon
      </div>
    </main>
  )
}
