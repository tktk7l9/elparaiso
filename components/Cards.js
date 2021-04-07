import Link from 'next/link'
import classes from './Cards.module.css'

export function Cards() {
  return (
    <div className={classes.grid}>
      <div className={classes.topLeft}>
        <Link href="/about">
          <img src="images/post24.jpg"/>
        </Link>
      </div>
      <div className={classes.topCenter}>
        <Link href="/melodies">
          <img src="images/post23.jpg" />
        </Link>
      </div>
      <div className={classes.topRight}>
        <Link href="/projects">
          <img src="images/post22.jpg" />
        </Link>
      </div>
      <div className={classes.bottomLeft}>
        <Link href="/store">
          <img src="images/post21.jpg" />
        </Link>
      </div>
      <div className={classes.bottomCenter}>
        <Link href="/library">
          <img src="images/post19.jpg" />
        </Link>
      </div>
      <div className={classes.bottomRight}>
        <Link href="/">
          <img src="images/post18.jpg" />
        </Link>
      </div>
    </div>
  )
}
