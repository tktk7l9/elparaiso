// Curated playlists shown on /melodies.
// Kept free of path aliases and React so node's test runner can import it.

export type PlaylistData = {
  title: string
  src: string
  embedUrl: string
  openUrl: string
}

export const PLAYLISTS: readonly PlaylistData[] = [
  {
    title: 'CURATED MELODIES #1',
    src: '/images/melodies/playlist0001.webp',
    embedUrl: 'https://open.spotify.com/embed/playlist/1jnkrS9FUGTzZ6nIOuZ0xE',
    openUrl: 'https://open.spotify.com/playlist/1jnkrS9FUGTzZ6nIOuZ0xE',
  },
]

export type MelodiesView =
  | { kind: 'empty' }
  | { kind: 'detail'; playlist: PlaylistData }
  | { kind: 'list'; playlists: readonly PlaylistData[] }

/**
 * Zero-one-infinity: with exactly one playlist there is nothing to choose,
 * so /melodies shows it directly instead of a one-item list.
 */
export function melodiesView(playlists: readonly PlaylistData[]): MelodiesView {
  if (playlists.length === 0) return { kind: 'empty' }
  if (playlists.length === 1) return { kind: 'detail', playlist: playlists[0] }
  return { kind: 'list', playlists }
}
