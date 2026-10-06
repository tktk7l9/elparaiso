import { test, vi } from 'vitest'
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

const configPath = require.resolve('../../next.config.js')

/** Reload next.config.js under `env` and return one CSP directive's sources. */
async function directiveWithEnv(env: Record<string, string>, directive: string): Promise<string[]> {
  for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v)
  delete require.cache[configPath]
  const rules = await require(configPath).headers()
  const value: string = rules
    .flatMap((rule: { headers: { key: string; value: string }[] }) => rule.headers)
    .find((h: { key: string }) => h.key === 'Content-Security-Policy').value
  const found = value
    .split(';')
    .map((d) => d.trim())
    .find((d) => d.startsWith(directive + ' '))
  return found ? found.split(/\s+/).slice(1) : []
}

function restoreConfig() {
  vi.unstubAllEnvs()
  delete require.cache[configPath]
}

test('production CSP does not allow eval; dev keeps it for React debugging', async () => {
  try {
    assert.ok(!(await directiveWithEnv({ NODE_ENV: 'production' }, 'script-src')).includes("'unsafe-eval'"))
    assert.ok((await directiveWithEnv({ NODE_ENV: 'development' }, 'script-src')).includes("'unsafe-eval'"))
  } finally {
    restoreConfig()
  }
})

test('connect-src allows only this Supabase project when its URL is known at build time', async () => {
  try {
    const sources = await directiveWithEnv(
      { NEXT_PUBLIC_SUPABASE_URL: 'https://abcdefghijklmnop.supabase.co/' },
      'connect-src',
    )
    assert.deepEqual(sources, ["'self'", 'https://abcdefghijklmnop.supabase.co', 'https://cloudflareinsights.com'])
    assert.ok(!sources.some((s) => s.includes('*')), 'no wildcard host')
    assert.ok(!sources.some((s) => s.startsWith('wss:')), 'Realtime is not used')
  } finally {
    restoreConfig()
  }
})

test('connect-src falls back to the Supabase wildcard when the URL is missing or malformed', async () => {
  try {
    for (const url of ['', 'not a url', 'http://insecure.supabase.co']) {
      const sources = await directiveWithEnv({ NEXT_PUBLIC_SUPABASE_URL: url }, 'connect-src')
      assert.ok(sources.includes('https://*.supabase.co'), `wildcard kept for ${JSON.stringify(url)}`)
      assert.ok(!sources.includes('http://insecure.supabase.co'), 'plain http origin never allowed')
    }
  } finally {
    restoreConfig()
  }
})
