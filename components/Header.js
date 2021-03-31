import Link from 'next/link'
import classes from './Header.module.css'

export function Header() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <a className={classes.anchor}>Index</a>
      </Link>
      <Link href="/about">
        <a className={classes.anchor}>About</a>
      </Link>
      <Link href="/melodies">
        <a className={classes.anchor}>Melodies</a>
      </Link>
      <Link href="/projects">
        <a className={classes.anchor}>Projects</a>
      </Link>
      <Link href="/store">
        <a className={classes.anchor}>Store</a>
      </Link>
      <Link href="/library">
        <a className={classes.anchor}>Library</a>
      </Link>
    </header>
  )
}
