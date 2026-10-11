import { test } from 'vitest'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// open-next.config.ts decides whether the Worker serves the prerendered pages or re-renders
// them on every request. Reverting it keeps the site working (every page still answers 200),
// so nothing but this test notices that each request costs a full render again.
const source = readFileSync('open-next.config.ts', 'utf8')

test('prerendered pages are read from the static assets incremental cache', () => {
  assert.match(
    source,
    /^import staticAssetsIncrementalCache from "@opennextjs\/cloudflare\/overrides\/incremental-cache\/static-assets-incremental-cache";$/m,
  )
  assert.match(source, /^\s*incrementalCache: staticAssetsIncrementalCache,$/m)
})

test('cached routes are answered before the Next server loads', () => {
  assert.match(source, /^\s*enableCacheInterception: true,$/m)
})
