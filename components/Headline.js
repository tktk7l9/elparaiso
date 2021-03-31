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
        </div>
    )
}
