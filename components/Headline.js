import Link from 'next/link'
import classes from './Headline.module.css'

export function Headline() {
    return (
        <div>
            <h1 className={classes.title}>
                <Link href="/">
                    EL PARAISO
                </Link>
            </h1>
            <p className={classes.description}>
                find your paradise inside of you
            </p>
        </div>
    )
}
