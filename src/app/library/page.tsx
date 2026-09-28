import type { Metadata } from 'next'
import { Headline } from 'src/components/Headline'
import { PageTitle } from 'src/components/PageTitle'
import { LibraryItems } from 'src/components/LibraryItems'

export const metadata: Metadata = { title: 'library' }

export default function Library() {
  return (
    <main className="text-center">
      <Headline />
      <PageTitle>library</PageTitle>
      <LibraryItems />
    </main>
  )
}
