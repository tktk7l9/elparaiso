import Link from "next/link";
import classes from "src/components/Footer/Footer.module.css";

export const Footer = () => {
  const LINKS = [
    {
      href: "https://www.instagram.com/elparaisojp/",
      title: "Instagram",
      isInnerLink: false,
    },
    {
      href: "https://elparaiso.stores.jp/",
      title: "Store",
      isInnerLink: false,
    },
    {
      href: "https://open.spotify.com/playlist/1jnkrS9FUGTzZ6nIOuZ0xE?si=70f4ef6442fb48f2",
      title: "Spotify",
      isInnerLink: false,
    },
    {
      href: "/contact",
      title: "Contact",
      isInnerLink: true,
    },
  ];
  return (
    <footer className={classes.footer}>
      <div className={classes.items}>Culture & Policy</div>
      {LINKS.map((link) => {
        const isInnerLink = link.isInnerLink;
        return (
          <div key={link.title} className={classes.items}>
            {isInnerLink ? (
              <Link href={link.href} className={classes.links}>
                {link.title}
              </Link>
            ) : (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.links}
              >
                {link.title}
              </a>
            )}
          </div>
        );
      })}
    </footer>
  );
};
