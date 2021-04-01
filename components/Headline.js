import classes from './Headline.module.css'

export function Headline(props) {
    return (
        <div>
            <h1 className={classes.title}>
                EL PARAISO
            </h1>
            <p className={classes.description}>
                find your paradise inside of you
            </p>
            <p className={classes.description}>
                {props.children}
            </p>
        </div>
    )
}
