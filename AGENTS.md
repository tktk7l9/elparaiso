<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# elparaiso development rules (for AI/Claude)

Website of the EL PARAISO community brand. Next.js 16 (App Router) built with
@opennextjs/cloudflare and served by Cloudflare Workers. Every route is prerendered.
Deploys happen only through Workers Builds when `main` changes.

## CSP and the Worker nonce

- The static baseline CSP lives in `next.config.js`
  (`script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com`). In production
  `wrangler.jsonc` `main` is `worker.ts`, which wraps `.open-next/worker.js` and, for every
  `text/html` response, replaces that `'unsafe-inline'` with a fresh per-request `'nonce-…'` and
  stamps the nonce on each inline JavaScript `<script>` via HTMLRewriter (`src/lib/csp-nonce.ts`).
  The header is replaced, never appended: exactly one CSP per response.
- **Never point `main` back at `.open-next/worker.js`**: the site keeps working and the CSP
  silently falls back to `'unsafe-inline'` (`src/lib/worker-entry.test.ts` blocks it).
- **Never add `'strict-dynamic'`**: the nonce is only on inline scripts, so it would make `'self'`
  (the `/_next/static` chunks) and the beacon host be ignored and stop them (`src/lib/csp.test.ts`).
- `public/` holds no HTML: Workers Assets serves those files before the Worker runs, so they would
  get no nonce and no `next.config.js` headers (`src/lib/worker-entry.test.ts`).
- `next dev` / `next start` do not run the Worker and keep the static header.

## Trust boundary of the nonce

- The Worker cannot tell the app's own inline scripts from injected ones. **Every inline
  classic/module `<script>` in the rendered HTML gets the nonce**, so the CSP does not stop a
  `<script>` element that reaches the server-rendered markup. That HTML must never contain
  attacker-controlled script.
- What the nonce does block: inline event handlers and `javascript:` URLs, external scripts from
  origins not in `script-src`, and inline scripts created later in the page without the nonce.
- The stamp is kept narrow (`isInlineJavaScript`): no `src`, no `href` / `xlink:href` (SVG
  scripts), and `type` absent, empty, a JavaScript MIME type or `module`. Data blocks such as
  `application/ld+json`, import maps and unknown types get no nonce.
- React escapes text and attributes. The raw-HTML sink `dangerouslySetInnerHTML` is banned outside
  the allowlist in `src/lib/raw-html.test.ts` (empty today), and DOM sinks (`innerHTML`,
  `insertAdjacentHTML`, `document.write`, Markdown raw HTML) are not used at all. Adding one needs
  an allowlist entry with the reason, plus a test that hostile input such as
  `</script><script>alert(1)</script>` cannot break out (JSON-LD: no `</script` or `<!--` in the
  output; Markdown: raw `<script>` and `on*` handlers dropped, `allowDangerousHtml` off).

## Cloudflare Web Analytics

- The beacon is appended after hydration by `src/components/Analytics`; never write it into the
  HTML (an external `<script src>` without `integrity` costs the Observatory SRI test).
- **Never add SRI to the beacon**: Cloudflare swaps the content behind the unversioned
  `beacon.min.js` URL, so a pinned `integrity` silently stops the beacon on its next update.
- The CSP keeps `https://static.cloudflareinsights.com` in `script-src` and
  `https://cloudflareinsights.com` in `connect-src` (`src/lib/analytics.test.ts`).

## Commands

- `npm run dev` / `npm run build` / `npm run preview` (OpenNext build + local Workers runtime)
- `npm run lint` / `npm run typecheck` / `npm test` / `npm run test:coverage` (thresholds in
  `vitest.config.mts`; CI fails when they slip)
