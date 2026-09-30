// Site navigation, shared by the header and the top-page cards.
// Kept free of React so it can be tested without rendering.

export const STORE_URL = 'https://elparaiso.stores.jp/'

export type NavItem = {
  label: string
  href: string
  external: boolean
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'about', href: '/about', external: false },
  { label: 'melodies', href: '/melodies', external: false },
  { label: 'projects', href: '/projects', external: false },
  { label: 'store', href: STORE_URL, external: true },
  { label: 'library', href: '/library', external: false },
  { label: 'contact', href: '/contact', external: false },
]

/** Screen-reader suffix for links that leave the site in a new tab. */
export const EXTERNAL_NOTE = '（外部サイト・新しいタブで開きます）'

/** True when `href` is the page being shown, or an ancestor of it. */
export function isCurrentPage(pathname: string | null, href: string): boolean {
  if (!pathname || !href.startsWith('/')) return false
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  if (href === '/') return path === '/'
  return path === href || path.startsWith(href + '/')
}

/** Alt text for a top-page card: the destination's name, not its slug or URL. */
export function cardAlt(item: Pick<NavItem, 'label' | 'external'>): string {
  const name = item.label.toUpperCase()
  return item.external ? name + EXTERNAL_NOTE : name
}
