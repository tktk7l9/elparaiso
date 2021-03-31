import Link from 'next/link'
import classes from './Headline.module.css'

export function Headline(props) {
    return (
        <div>
            <h1 className={classes.title}>
                {props.page}
            </h1>
            <p className={classes.description}>
                {props.children}
            </p>
            <Link href="/">Index </Link>
            <Link href="/about">About </Link>
            <Link href="/melodies">Melodies </Link>
            <Link href="/projects">Projects </Link>
            <Link href="/store">Store</Link>
        </div>
    )
}
