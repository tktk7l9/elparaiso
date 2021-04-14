import Link from 'next/link'
import classes from 'src/components/Header/Header.module.css'

export function Header() {
  const PAGES = [
    "about",
    "melodies",
    "projects",
    "store",
    "library"
  ]
  return (
    <header className={classes.header}>
      {PAGES.map((page) => {
        let pageLink = "/" + page
        return (
          <Link key={page} href={pageLink}>
            <a className={classes.anchor}>{page}</a>
          </Link>
        )
      })}
    </header>
  )
}
