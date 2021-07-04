import Link from "next/link";
import classes from "src/components/Header/Header.module.css";

export function Header() {
  const PAGES = ["about", "melodies", "projects", "store", "library"];
  return (
    <header className={classes.header}>
      {PAGES.map((page) => {
        let pageLink = "/" + page;
        return page === "store" ? (
          <a
            href="https://elparaiso.stores.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.anchor}
            key={page}
          >
            {page}
          </a>
        ) : (
          <Link key={page} href={pageLink}>
            <a className={classes.anchor}>{page}</a>
          </Link>
        );
      })}
    </header>
  );
}
