import Link from 'next/link'
import classes from 'src/components/Headline/Headline.module.css'

export function Headline() {
  return (
    <div>
      <Link href="/">
        <img
          src="images/logo.svg"
          className={classes.logo}
        />
      </Link>
    </div>
  )
}
