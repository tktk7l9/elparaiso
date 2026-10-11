import { describe, test } from 'vitest'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// Raw-HTML sinks put markup on the page without React's escaping. In the server-rendered HTML
// that matters twice over: an injected <script> there would also receive the Worker's CSP nonce
// (src/lib/csp-nonce.ts, "Trust boundary"), so the CSP could not stop it.
//
// Every dangerouslySetInnerHTML must be listed in ALLOWED with the reason it is safe, and come
// with a test that hostile input such as `</script><script>alert(1)</script>` cannot break out:
// for a JSON-LD helper, the output never contains `</script` or `<!--`; for a Markdown renderer,
// raw <script> and on* handlers are dropped and allowDangerousHtml stays off.
const ALLOWED: Record<string, string> = {
  // 'src/components/Example/index.tsx': 'why it is safe, and which test proves it',
}

// Matches the prop (JSX `={{ __html }}` or createElement `{ dangerouslySetInnerHTML: ... }`),
// not prose that merely names it.
const DANGEROUSLY_SET_INNER_HTML = /dangerouslySetInnerHTML\s*[=:]|\b__html\b/

// Other ways to inject raw markup; none is used today, so none is allowed.
const OTHER_SINKS: [string, RegExp][] = [
  ['innerHTML / outerHTML assignment', /\.(?:inner|outer)HTML\s*=(?!=)/],
  ['insertAdjacentHTML', /\binsertAdjacentHTML\s*\(/],
  ['document.write', /\bdocument\.write(?:ln)?\s*\(/],
  ['createContextualFragment', /\bcreateContextualFragment\s*\(/],
  ['Markdown raw HTML (allowDangerousHtml / rehype-raw)', /\ballowDangerousHtml\b|rehype-raw/],
]

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((f) => /\.(?:[cm]?[jt]sx?)$/.test(f) && !/\.test\.[jt]sx?$/.test(f))
    .map((f) => join(dir, f))
    .sort()
}

const files = sourceFiles('src').map((path) => ({ path, source: readFileSync(path, 'utf8') }))

describe('raw-HTML sinks', () => {
  test('the scan sees the source tree', () => {
    assert.ok(files.some((f) => f.path === join('src', 'app', 'layout.tsx')))
  })

  test('dangerouslySetInnerHTML appears only in allowlisted files', () => {
    const users = files.filter((f) => DANGEROUSLY_SET_INNER_HTML.test(f.source)).map((f) => f.path)
    assert.deepEqual(
      users.filter((path) => !(path in ALLOWED)),
      [],
      'add the file to ALLOWED with a reason and a break-out test, or render it as React text',
    )
    // A stale entry would silently allow a future use in that file without review.
    assert.deepEqual(
      Object.keys(ALLOWED).filter((path) => !users.includes(path)),
      [],
    )
  })

  test.each(OTHER_SINKS)('no %s anywhere in src/', (_label, pattern) => {
    assert.deepEqual(
      files.filter((f) => pattern.test(f.source)).map((f) => f.path),
      [],
    )
  })

  test('the patterns catch real uses and ignore prose', () => {
    assert.match('<div dangerouslySetInnerHTML={{ __html: x }} />', DANGEROUSLY_SET_INNER_HTML)
    assert.match("createElement('div', { dangerouslySetInnerHTML: { __html: x } })", DANGEROUSLY_SET_INNER_HTML)
    assert.doesNotMatch('// the one sink (dangerouslySetInnerHTML) is banned', DANGEROUSLY_SET_INNER_HTML)
    assert.match('el.innerHTML = html', OTHER_SINKS[0][1])
    assert.doesNotMatch('el.innerHTML === html', OTHER_SINKS[0][1])
  })
})
