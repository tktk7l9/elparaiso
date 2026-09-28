/**
 * The site's canonical URL.
 *
 * metadataBase / OGP read it from here. It used to be hard-coded in layout.tsx,
 * which made it easy to miss when moving hosts.
 *
 * Moved from Vercel (elparaiso.vercel.app) to Cloudflare Workers on 2026-08-16.
 * The Vercel account as a whole returns 402 after exceeding Fair Use, so leaving the
 * old URL as canonical would mark a dead page as the canonical one.
 */
export const siteUrl = 'https://elparaiso.saitotakuya0719.workers.dev'
