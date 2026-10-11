import { afterEach, describe, test, vi } from 'vitest'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import {
  applyScriptNonce,
  createNonce,
  CSP_HEADER,
  type Rewriter,
  type ScriptElement,
  withScriptNonce,
  wrapWithScriptNonce,
} from './csp-nonce.ts'

const require = createRequire(import.meta.url)

/** The production CSP exactly as next.config.js serves it (dev adds 'unsafe-eval'). */
async function productionCsp(): Promise<string> {
  const configPath = require.resolve('../../next.config.js')
  vi.stubEnv('NODE_ENV', 'production')
  delete require.cache[configPath]
  try {
    const rules = await require(configPath).headers()
    return rules
      .flatMap((rule: { headers: { key: string; value: string }[] }) => rule.headers)
      .find((h: { key: string }) => h.key === CSP_HEADER).value
  } finally {
    vi.unstubAllEnvs()
    delete require.cache[configPath]
  }
}

const STATIC_CSP = await productionCsp()

const BASE64_128_BITS = /^[A-Za-z0-9+/]{22}==$/

/** Records the handler so tests can feed it fake <script> elements. */
function fakeRewriter() {
  const calls: { selector: string; handler: (el: ScriptElement) => void }[] = []
  const transformed: Response[] = []
  const rewriter: Rewriter = {
    on(selector, handlers) {
      calls.push({ selector, handler: handlers.element })
      return rewriter
    },
    transform(response) {
      transformed.push(response)
      return response
    },
  }
  return { rewriter: () => rewriter, calls, transformed }
}

function stubHTMLRewriter(fake: ReturnType<typeof fakeRewriter>) {
  vi.stubGlobal(
    'HTMLRewriter',
    class {
      constructor() {
        return fake.rewriter()
      }
    },
  )
}

function script(attrs: Record<string, string>) {
  return {
    attrs,
    hasAttribute: (name: string) => name in attrs,
    setAttribute(name: string, value: string) {
      attrs[name] = value
    },
  }
}

function html(headers: Record<string, string> = {}) {
  return new Response('<html><script>1</script></html>', {
    status: 200,
    statusText: 'OK',
    headers: { 'content-type': 'text/html; charset=utf-8', [CSP_HEADER]: STATIC_CSP, ...headers },
  })
}

const nonceOf = (r: Response) => r.headers.get(CSP_HEADER)?.match(/'nonce-([^']+)'/)?.[1]

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('createNonce', () => {
  test('returns 128 random bits as base64', () => {
    assert.match(createNonce(), BASE64_128_BITS)
  })

  test('never repeats across many calls', () => {
    assert.equal(new Set(Array.from({ length: 1000 }, createNonce)).size, 1000)
  })
})

describe('withScriptNonce', () => {
  test("replaces 'unsafe-inline' in script-src only, keeping 'self' and the beacon host", () => {
    const out = withScriptNonce(STATIC_CSP, 'abc')
    assert.ok(out?.includes("script-src 'self' 'nonce-abc' https://static.cloudflareinsights.com;"), out ?? '')
    // style-src keeps 'unsafe-inline' (inlined CSS), which Observatory accepts.
    assert.ok(out?.includes("style-src 'self' 'unsafe-inline';"))
    assert.doesNotMatch(out ?? '', /script-src[^;]*unsafe-inline/)
    // Only the script-src token changes; the rest of the policy is byte-identical.
    assert.equal(out, STATIC_CSP.replace("script-src 'self' 'unsafe-inline'", "script-src 'self' 'nonce-abc'"))
  })

  test("never adds 'strict-dynamic' (it would block the beacon and the chunks, which carry no nonce)", () => {
    assert.ok(!withScriptNonce(STATIC_CSP, 'abc')?.includes('strict-dynamic'))
  })

  test('handles script-src as the first directive', () => {
    assert.equal(withScriptNonce("script-src 'unsafe-inline'; img-src 'self'", 'n'), "script-src 'nonce-n'; img-src 'self'")
  })

  test('returns null when there is nothing to tighten', () => {
    assert.equal(withScriptNonce("default-src 'self'; script-src 'self'", 'n'), null)
    assert.equal(withScriptNonce("style-src 'unsafe-inline'", 'n'), null)
  })
})

describe('applyScriptNonce', () => {
  test('swaps the CSP for a nonce one and stamps every inline script, but no external one', () => {
    const fake = fakeRewriter()
    const out = applyScriptNonce(html({ etag: '"x"', 'content-length': '31' }), { nonce: 'N', rewriter: fake.rewriter })

    assert.equal(out.status, 200)
    assert.equal(out.statusText, 'OK')
    assert.equal(
      out.headers.get(CSP_HEADER),
      STATIC_CSP.replace("script-src 'self' 'unsafe-inline'", "script-src 'self' 'nonce-N'"),
    )
    assert.equal(out.headers.get('etag'), null)
    assert.equal(out.headers.get('content-length'), null)
    assert.equal(out.headers.get('content-type'), 'text/html; charset=utf-8')

    assert.equal(fake.calls.length, 1)
    assert.equal(fake.calls[0].selector, 'script')
    // Next writes several inline RSC payload scripts per page; each one needs the nonce.
    const payloads = [script({}), script({}), script({ id: '_R_' })]
    const external = script({ src: '/_next/static/chunks/a.js', async: '' })
    for (const el of [...payloads, external]) fake.calls[0].handler(el)
    for (const el of payloads) assert.equal(el.attrs.nonce, 'N')
    // External scripts are allowed by 'self'; a nonce on them would also bless injected ones.
    assert.equal(external.attrs.nonce, undefined)
  })

  test('keeps exactly one CSP header and the other headers', () => {
    const out = applyScriptNonce(html({ 'x-frame-options': 'DENY' }), { nonce: 'N', rewriter: fakeRewriter().rewriter })
    assert.equal(out.headers.get(CSP_HEADER)?.match(/default-src/g)?.length, 1)
    assert.equal(out.headers.get('x-frame-options'), 'DENY')
  })

  test('generates a fresh nonce per call by default and stamps the one it puts in the header', () => {
    const fake = fakeRewriter()
    const a = applyScriptNonce(html(), { rewriter: fake.rewriter })
    const b = applyScriptNonce(html(), { rewriter: fake.rewriter })
    assert.match(nonceOf(a) ?? '', BASE64_128_BITS)
    assert.notEqual(nonceOf(a), nonceOf(b))
    const inline = script({})
    fake.calls[0].handler(inline)
    assert.equal(inline.attrs.nonce, nonceOf(a))
  })

  test.each([
    ['non-HTML', new Response('{}', { headers: { 'content-type': 'application/json', [CSP_HEADER]: STATIC_CSP } })],
    ['RSC payload', new Response('0:[]', { headers: { 'content-type': 'text/x-component', [CSP_HEADER]: STATIC_CSP } })],
    ['no content-type', new Response(new Uint8Array([120]), { headers: { [CSP_HEADER]: STATIC_CSP } })],
    ['no body', new Response(null, { status: 304, headers: { 'content-type': 'text/html' } })],
    ['no CSP', new Response('<p>', { headers: { 'content-type': 'text/html' } })],
    [
      "CSP without 'unsafe-inline'",
      new Response('<p>', { headers: { 'content-type': 'text/html', [CSP_HEADER]: "script-src 'self'" } }),
    ],
  ])('passes %s responses through untouched', (_label, response) => {
    const fake = fakeRewriter()
    assert.equal(applyScriptNonce(response, { rewriter: fake.rewriter }), response)
    assert.equal(fake.calls.length, 0)
  })

  test('needs no options for responses it leaves alone', () => {
    const json = new Response('{}', { headers: { 'content-type': 'application/json' } })
    assert.equal(applyScriptNonce(json), json)
  })

  test('uses the Workers HTMLRewriter by default', () => {
    const fake = fakeRewriter()
    stubHTMLRewriter(fake)
    applyScriptNonce(html(), { nonce: 'N' })
    assert.equal(fake.transformed.length, 1)
  })

  test('fails loudly outside the Workers runtime instead of serving a nonce nobody stamped', () => {
    assert.throws(() => applyScriptNonce(html(), { nonce: 'N' }), /HTMLRewriter/)
  })
})

describe('wrapWithScriptNonce', () => {
  test('hands the request to the inner worker and returns its HTML with a nonce CSP', async () => {
    const fake = fakeRewriter()
    stubHTMLRewriter(fake)
    const inner = { fetch: vi.fn(async () => html()) }
    const request = new Request('https://elparaiso.example/about')
    const env = { ASSETS: {} }
    const ctx = { waitUntil() {} }

    const response = await wrapWithScriptNonce(inner).fetch(request, env, ctx)

    assert.deepEqual(inner.fetch.mock.calls[0], [request, env, ctx])
    assert.match(nonceOf(response) ?? '', BASE64_128_BITS)
    const inline = script({})
    fake.calls[0].handler(inline)
    assert.equal(inline.attrs.nonce, nonceOf(response))
    assert.equal(fake.transformed.length, 1)
  })

  test('gives each request its own nonce', async () => {
    stubHTMLRewriter(fakeRewriter())
    const worker = wrapWithScriptNonce({ fetch: async () => html() })
    const first = await worker.fetch(new Request('https://elparaiso.example/'), {}, {})
    const second = await worker.fetch(new Request('https://elparaiso.example/'), {}, {})
    assert.notEqual(nonceOf(first), nonceOf(second))
  })

  test('returns non-HTML responses from the inner worker as they are', async () => {
    const png = new Response(new Uint8Array([137]), { headers: { 'content-type': 'image/png' } })
    const worker = wrapWithScriptNonce({ fetch: async () => png })
    assert.equal(await worker.fetch(new Request('https://elparaiso.example/opengraph-image'), {}, {}), png)
  })
})
