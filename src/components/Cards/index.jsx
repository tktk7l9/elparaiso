import Link from 'next/link'
import classes from 'src/components/Cards/Cards.module.css'

export function Cards() {
  return (
    <div className={classes.grid}>
      <div className={classes.topLeft}>
        <Link href="/about">
          <img src="images/top/about.webp"/>
        </Link>
      </div>
      <div className={classes.topCenter}>
        <Link href="/melodies">
          <img src="images/top/melodies.webp" />
        </Link>
      </div>
      <div className={classes.topRight}>
        <Link href="/projects">
          <img src="images/top/projects.webp" />
        </Link>
      </div>
      <div className={classes.bottomLeft}>
        <a
          href="https://elparaiso.stores.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="images/top/store.webp" />
        </a>
        {/* <Link href="/store">
          <img src="images/top/store.webp" />
        </Link> */}
      </div>
      <div className={classes.bottomCenter}>
        <Link href="/library">
          <img src="images/top/library.webp" />
        </Link>
      </div>
    </div>
  )
}
