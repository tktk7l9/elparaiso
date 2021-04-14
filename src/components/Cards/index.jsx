import Link from 'next/link'
import classes from 'src/components/Cards/Cards.module.css'

export function Cards() {
  return (
    <div className={classes.grid}>
      <div className={classes.topLeft}>
        <Link href="/about">
          <img src="images/top/post24.jpg"/>
        </Link>
      </div>
      <div className={classes.topCenter}>
        <Link href="/melodies">
          <img src="images/top/post23.jpg" />
        </Link>
      </div>
      <div className={classes.topRight}>
        <Link href="/projects">
          <img src="images/top/post22.jpg" />
        </Link>
      </div>
      <div className={classes.bottomLeft}>
        <Link href="/store">
          <img src="images/top/post21.jpg" />
        </Link>
      </div>
      <div className={classes.bottomCenter}>
        <Link href="/library">
          <img src="images/top/post19.jpg" />
        </Link>
      </div>
      <div className={classes.bottomRight}>
        <Link href="/">
          <img src="images/top/post18.jpg" />
        </Link>
      </div>
    </div>
  )
}
