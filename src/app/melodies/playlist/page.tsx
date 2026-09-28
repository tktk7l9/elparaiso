import type { Metadata } from 'next'
import { Headline } from 'src/components/Headline'
import { PlaylistDetail } from 'src/components/PlaylistDetail'
import { PageTitle } from 'src/components/PageTitle'
import { PLAYLISTS } from 'src/lib/playlists'

export const metadata: Metadata = { title: 'playlist' }

export default function PlaylistPage() {
  return (
    <main className="text-center">
      <Headline />
      <PageTitle>melodies</PageTitle>
      <PlaylistDetail playlist={PLAYLISTS[0]} />
    </main>
  )
}
