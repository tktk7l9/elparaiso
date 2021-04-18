import classes from 'src/components/Footer/Footer.module.css'

export function Footer() {
  const LINKS = [
    {
      href: "https://www.instagram.com/elparaisojp/",
      title: "Instagram"
    },
    {
      href: "https://elparaiso.stores.jp/",
      title: "Store"
    },
    {
      href: "https://open.spotify.com/playlist/1jnkrS9FUGTzZ6nIOuZ0xE?si=70f4ef6442fb48f2",
      title: "Spotify"
    }
  ]
  return (
    <footer className={classes.footer}>
      <div className={classes.items}>
        Culture & Policy
      </div>
      {LINKS.map((link) => {
        return (
          <div className={classes.items}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.links}
            >
              {link.title}
            </a>
          </div>
        )
      })}
    </footer>
  )
}
