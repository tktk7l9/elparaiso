import { test, vi } from 'vitest'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { BEACON_SRC, BEACON_TOKEN } from './analytics.ts'
import { withScriptNonce } from './csp-nonce.ts'

const require = createRequire(import.meta.url)
const configPath = require.resolve('../../next.config.js')

/** The production CSP from next.config.js. */
async function productionCsp(): Promise<string> {
  vi.stubEnv('NODE_ENV', 'production')
  delete require.cache[configPath]
  try {
    const rules = await require(configPath).headers()
    return rules
      .flatMap((rule: { headers: { key: string; value: string }[] }) => rule.headers)
      .find((h: { key: string }) => h.key === 'Content-Security-Policy').value
  } finally {
    vi.unstubAllEnvs()
    delete require.cache[configPath]
  }
}

const origin = new URL(BEACON_SRC).origin
const allowsBeacon = new RegExp(`script-src [^;]*${origin}(?:[ ;]|$)`)

test('the beacon loads from an origin the CSP allows in script-src', async () => {
  assert.match(await productionCsp(), allowsBeacon)
})

test("the beacon stays allowed after the Worker swaps 'unsafe-inline' for a nonce", async () => {
  // It is appended at runtime without a nonce, so the host source must survive the swap.
  assert.match(withScriptNonce(await productionCsp(), 'n') ?? '', allowsBeacon)
})

test('the site token is a 32-digit hex', () => {
  assert.match(BEACON_TOKEN, /^[0-9a-f]{32}$/)
})
