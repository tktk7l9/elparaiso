import { test } from 'vitest'
import assert from 'node:assert/strict'
import { NAV_ITEMS, cardAlt, isCurrentPage } from './nav.ts'

test('header nav includes contact, the page that serves the major task', () => {
  assert.ok(NAV_ITEMS.some((item) => item.href === '/contact'))
})

test('store points to the external shop and is marked external', () => {
  const store = NAV_ITEMS.find((item) => item.label === 'store')
  assert.equal(store?.href, 'https://elparaiso.stores.jp/')
  assert.equal(store?.external, true)
})

test('only internal links are marked internal', () => {
  for (const item of NAV_ITEMS) {
    assert.equal(item.external, item.href.startsWith('http'), item.label)
  }
})

test('isCurrentPage matches the exact path and nested paths', () => {
  assert.equal(isCurrentPage('/about', '/about'), true)
  assert.equal(isCurrentPage('/melodies/playlist', '/melodies'), true)
  assert.equal(isCurrentPage('/about/', '/about'), true)
})

test('isCurrentPage does not match prefixes of other words, external links or null', () => {
  assert.equal(isCurrentPage('/aboutus', '/about'), false)
  assert.equal(isCurrentPage('/', '/about'), false)
  assert.equal(isCurrentPage('/store', 'https://elparaiso.stores.jp/'), false)
  assert.equal(isCurrentPage(null, '/about'), false)
})

test('cardAlt names the destination instead of a slug or URL', () => {
  assert.equal(cardAlt({ label: 'about', external: false }), 'ABOUT')
  assert.equal(
    cardAlt({ label: 'store', external: true }),
    'STORE（外部サイト・新しいタブで開きます）',
  )
})
