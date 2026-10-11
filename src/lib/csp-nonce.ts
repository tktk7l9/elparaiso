// Per-request script nonce for HTML responses, applied by the Worker entry (worker.ts).
//
// headers() in next.config.js serve a static CSP whose script-src has 'unsafe-inline' because
// Next writes its RSC payload as inline <script> (self.__next_f.push). The payload differs on
// every page, so one set of hashes cannot cover the site, and Next 16's middleware (the usual
// nonce source) does not run on OpenNext. Every HTML response does pass through the Worker,
// though (public/ holds no HTML), so the Worker swaps 'unsafe-inline' in script-src for a fresh
// nonce and stamps that nonce on each inline JavaScript <script> with HTMLRewriter (streaming, no
// buffering).
//
// Trust boundary: the Worker cannot tell the app's own inline scripts from injected ones. Every
// inline classic/module <script> that reaches the rendered HTML gets the nonce, so the nonce does
// NOT protect against a <script> element smuggled into the server-rendered markup; that HTML must
// stay free of attacker-controlled script. React escapes text and attributes, and the one raw-HTML
// sink (dangerouslySetInnerHTML) is banned outside the allowlist in src/lib/raw-html.test.ts.
// What the nonce does block: inline event handlers and javascript: URLs, external scripts from
// unlisted origins, and inline scripts created later in the page (DOM injection) without the
// nonce. To keep the blessing as narrow as possible, only inline JavaScript is stamped
// (isInlineJavaScript): never a <script> with src / href / xlink:href (allowed or blocked by the
// source list on its own merits) and never a data block such as application/ld+json.
//
// 'strict-dynamic' is deliberately NOT added: 'self' keeps allowing the /_next/static chunks and
// the host source keeps allowing the Cloudflare Web Analytics beacon, which
// src/components/Analytics appends after hydration without a nonce.
//
// Responses that are not HTML (RSC, images, text) keep the static header unchanged; they run no
// inline script. `next dev` / `next start` never reach this code and keep the static CSP.

export const CSP_HEADER = 'Content-Security-Policy'

/** 128 random bits, base64. */
export function createNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  return btoa(String.fromCharCode(...bytes))
}

/**
 * Replaces 'unsafe-inline' in the script-src directive with 'nonce-<nonce>'.
 * Returns null when script-src has no 'unsafe-inline' (nothing to tighten), so the caller
 * leaves the response untouched instead of stamping nonces nobody checks.
 */
export function withScriptNonce(policy: string, nonce: string): string | null {
  let replaced = false
  const directives = policy.split(';').map((directive) => {
    const tokens = directive.trim().split(/\s+/)
    if (tokens[0] !== 'script-src' || !tokens.includes("'unsafe-inline'")) return directive
    replaced = true
    const rewritten = tokens.map((t) => (t === "'unsafe-inline'" ? `'nonce-${nonce}'` : t)).join(' ')
    // Keep the original leading space so the joined policy reads the same as the input.
    return directive.startsWith(' ') ? ` ${rewritten}` : rewritten
  })
  return replaced ? directives.join(';') : null
}

/** The subset of Cloudflare's HTMLRewriter used here (no workers-types dependency). */
export interface ScriptElement {
  getAttribute(name: string): string | null
  hasAttribute(name: string): boolean
  setAttribute(name: string, value: string): unknown
}

// HTML's "JavaScript MIME type essence" strings: a <script> whose type is one of these runs as a
// classic script. https://html.spec.whatwg.org/multipage/scripting.html#javascript-mime-type
const JAVASCRIPT_MIME_TYPES = new Set([
  'application/ecmascript',
  'application/javascript',
  'application/x-ecmascript',
  'application/x-javascript',
  'text/ecmascript',
  'text/javascript',
  'text/javascript1.0',
  'text/javascript1.1',
  'text/javascript1.2',
  'text/javascript1.3',
  'text/javascript1.4',
  'text/javascript1.5',
  'text/jscript',
  'text/livescript',
  'text/x-ecmascript',
  'text/x-javascript',
])

// src on HTML scripts; href / xlink:href on SVG scripts, which have no src.
const EXTERNAL_SOURCE_ATTRIBUTES = ['src', 'href', 'xlink:href']

const asciiLowercase = (s: string) => s.replace(/[A-Z]/g, (c) => c.toLowerCase())
const stripAsciiWhitespace = (s: string) => s.replace(/^[\t\n\f\r ]+|[\t\n\f\r ]+$/g, '')

/**
 * True when the browser would run this <script> as inline classic or module JavaScript, the only
 * kind that needs (and gets) the nonce. Mirrors "prepare the script element" in the HTML spec:
 * no type (or an empty one) means JavaScript, otherwise the trimmed type must be a JavaScript
 * MIME type or "module". Everything else (external scripts, data blocks, import maps, unknown
 * types) is left without a nonce. Attribute values are seen as written: an entity-encoded type
 * fails the match and the script is blocked, never blessed.
 */
export function isInlineJavaScript(el: ScriptElement): boolean {
  if (EXTERNAL_SOURCE_ATTRIBUTES.some((name) => el.hasAttribute(name))) return false
  const type = el.getAttribute('type')
  const language = el.getAttribute('language')
  let typeString: string
  if (type === '' || (type === null && !language)) typeString = 'text/javascript'
  else if (type !== null) typeString = stripAsciiWhitespace(type)
  else typeString = `text/${language}`
  typeString = asciiLowercase(typeString)
  return typeString === 'module' || JAVASCRIPT_MIME_TYPES.has(typeString)
}
export interface Rewriter {
  on(selector: string, handlers: { element(el: ScriptElement): void }): Rewriter
  transform(response: Response): Response
}

function workersRewriter(): Rewriter {
  const ctor = (globalThis as { HTMLRewriter?: new () => Rewriter }).HTMLRewriter
  if (!ctor) throw new Error('HTMLRewriter is not available outside the Workers runtime')
  return new ctor()
}

/**
 * Tightens the CSP of an HTML response to a per-request nonce and stamps that nonce on every
 * inline JavaScript <script> (isInlineJavaScript). External scripts and data blocks are left
 * alone. Exactly one CSP header is kept: the static one is replaced, never appended to.
 */
export function applyScriptNonce(
  response: Response,
  { nonce = createNonce(), rewriter = workersRewriter }: { nonce?: string; rewriter?: () => Rewriter } = {},
): Response {
  if (!response.body) return response
  if (!(response.headers.get('content-type') ?? '').toLowerCase().startsWith('text/html')) {
    return response
  }
  const policy = response.headers.get(CSP_HEADER)
  const tightened = policy === null ? null : withScriptNonce(policy, nonce)
  if (tightened === null) return response

  const headers = new Headers(response.headers)
  headers.set(CSP_HEADER, tightened)
  // The body now differs per request: a validator would let a 304 pair an old body
  // (old nonce) with a new header (new nonce) and block every inline script.
  headers.delete('etag')
  headers.delete('content-length')

  const rewritten = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
  return rewriter()
    .on('script', {
      element(el) {
        if (isInlineJavaScript(el)) el.setAttribute('nonce', nonce)
      },
    })
    .transform(rewritten)
}

/** A Workers module handler, typed loosely (no workers-types dependency). */
export interface FetchHandler {
  fetch(request: Request, env: unknown, ctx: unknown): Promise<Response>
}

/**
 * Wraps a Workers handler (the OpenNext worker, in worker.ts) so each of its responses goes
 * through applyScriptNonce. Request, env and ctx are passed through untouched.
 */
export function wrapWithScriptNonce(inner: FetchHandler): FetchHandler {
  return {
    async fetch(request, env, ctx) {
      return applyScriptNonce(await inner.fetch(request, env, ctx))
    },
  }
}
