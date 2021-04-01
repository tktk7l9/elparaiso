import classes from './Links.module.css'

export function Links() {
  return (
    <div className={classes.grid}>
        <a
          href="https://www.instagram.com/elparaisojp/"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.card}
        >
          <h3 className={classes.title}>
            Instagram &rarr;
          </h3>
          <p className={classes.description}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>
        <a
          href="https://elparaiso.stores.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.card}
        >
          <h3 className={classes.title}>
            Store &rarr;
          </h3>
          <p className={classes.description}>
            Learn about Next.js in an interactive course with quizzes!
          </p>
        </a>
    </div>
  )
}
