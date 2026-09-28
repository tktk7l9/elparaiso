import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { PLAYLISTS } from './playlists.ts'

const require = createRequire(import.meta.url)
const nextConfig = require('../../next.config.js')

async function cspDirectives(): Promise<Map<string, string[]>> {
  const rules = await nextConfig.headers()
  const header = rules
    .flatMap((rule: { headers: { key: string; value: string }[] }) => rule.headers)
    .find((h: { key: string }) => h.key === 'Content-Security-Policy')
  assert.ok(header, 'CSP header is set')
  const map = new Map<string, string[]>()
  for (const part of header.value.split(';')) {
    const [name, ...sources] = part.trim().split(/\s+/)
    if (name) map.set(name, sources)
  }
  return map
}

test('CSP lets every playlist embed load in its iframe', async () => {
  const csp = await cspDirectives()
  const frameSrc = csp.get('frame-src') ?? csp.get('default-src') ?? []
  for (const p of PLAYLISTS) {
    const origin = new URL(p.embedUrl).origin
    assert.ok(frameSrc.includes(origin), `${origin} allowed by frame-src`)
  }
})

test('CSP frame-src stays narrow (no wildcard, no self-framing of other sites)', async () => {
  const csp = await cspDirectives()
  assert.deepEqual(csp.get('frame-src'), ['https://open.spotify.com'])
  assert.deepEqual(csp.get('frame-ancestors'), ["'none'"])
})
