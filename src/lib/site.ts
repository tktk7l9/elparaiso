/**
 * サイトの正規 URL。
 *
 * metadataBase / OGP がここを参照する。以前は layout.tsx に直書きされており、
 * ホスティング移行時に取りこぼす形になっていた。
 *
 * 2026-08-16 に Vercel (elparaiso.vercel.app) から Cloudflare Workers へ移行。
 * Vercel 側は Fair Use 超過でアカウントごと 402 になっており、旧 URL を
 * canonical に残すと死んだページを正規扱いさせてしまう。
 */
export const siteUrl = 'https://elparaiso.saitotakuya0719.workers.dev'
