import classes from './Links.module.css'

export function Links() {
  const LINKS = [
    {
      href: "https://www.instagram.com/elparaisojp/",
      title: "Instagram →",
      description: "Find in-depth information about Next.js features and API."
    },
    {
      href: "https://elparaiso.stores.jp/",
      title: "Store →",
      description: "Learn about Next.js in an interactive course with quizzes!"
    }
  ]
  return (
    <div className={classes.grid}>
      {LINKS.map((link) => {
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.card}
          >
            <h3 className={classes.title}>
              {link.title}
            </h3>
            <p className={classes.description}>
              {link.description}
            </p>
        </a>
        )
      })}
    </div>
  )
}
