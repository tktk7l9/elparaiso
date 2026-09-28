import type { Metadata } from 'next'
import { Headline } from 'src/components/Headline'
import { PageTitle } from 'src/components/PageTitle'
import { Spotify } from 'src/components/Spotify'

export const metadata: Metadata = { title: 'melodies' }

export default function Melodies() {
  return (
    <main className="text-center">
      <Headline />
      <PageTitle>melodies</PageTitle>
      <Spotify />
    </main>
  )
}
