import { test } from 'vitest'
import assert from 'node:assert/strict'
import { PLAYLISTS, melodiesView } from './playlists.ts'

const one = PLAYLISTS[0]

test('a single playlist is shown directly, without an extra list click', () => {
  assert.deepEqual(melodiesView([one]), { kind: 'detail', playlist: one })
})

test('several playlists are shown as a list', () => {
  const two = [one, { ...one, title: 'CURATED MELODIES #2' }]
  assert.deepEqual(melodiesView(two), { kind: 'list', playlists: two })
})

test('no playlists yields an empty state', () => {
  assert.deepEqual(melodiesView([]), { kind: 'empty' })
})

test('each playlist carries both an embed URL and a link-out URL', () => {
  for (const p of PLAYLISTS) {
    assert.match(p.embedUrl, /^https:\/\/open\.spotify\.com\/embed\/playlist\//)
    assert.match(p.openUrl, /^https:\/\/open\.spotify\.com\/playlist\//)
  }
})
