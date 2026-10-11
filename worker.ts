// Worker entry (wrangler.jsonc "main"). Wraps the OpenNext worker so every HTML response gets
// a per-request script nonce instead of script-src 'unsafe-inline' (src/lib/csp-nonce.ts).
// Static assets (/_next/static/*, /images/*, favicon.ico) are served by Workers Assets before
// this runs. https://opennext.js.org/cloudflare/howtos/custom-worker
// src/lib/worker-entry.test.ts pins the import and export lines below by text, because the
// build output they reference does not exist when the tests run.

// The file exists only after `opennextjs-cloudflare build`; wrangler resolves it when bundling.
// @ts-ignore -- missing in CI (no build yet), present locally after a build
import openNextWorker from './.open-next/worker.js'
import { wrapWithScriptNonce } from './src/lib/csp-nonce'

export default wrapWithScriptNonce(openNextWorker)
