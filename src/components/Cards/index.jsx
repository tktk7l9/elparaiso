import Link from "next/link";
import Image from "next/image";
import classes from "src/components/Cards/Cards.module.css";

export const Cards = () => {
  return (
    <div className={classes.grid}>
      <div className={classes.topLeft}>
        <Link href="/about">
          <Image
            className={classes.img}
            src="/images/top/about.webp"
            alt="about"
            width={500}
            height={500}
          />
        </Link>
      </div>
      <div className={classes.topCenter}>
        <Link href="/melodies">
          <Image
            className={classes.img}
            src="/images/top/melodies.webp"
            alt="melodies"
            width={500}
            height={500}
          />
        </Link>
      </div>
      <div className={classes.topRight}>
        <Link href="/projects">
          <Image
            className={classes.img}
            src="/images/top/projects.webp"
            alt="projects"
            width={500}
            height={500}
          />
        </Link>
      </div>
      <div className={classes.bottomLeft}>
        <a
          href="https://elparaiso.stores.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className={classes.img}
            src="/images/top/store.webp"
            alt="store"
            width={500}
            height={500}
          />
        </a>
        {/* <Link href="/store">
          <Image 
            className={classes.img}
            src="/images/top/store.webp"
            alt="store"
            width={500}
            height={500}
          />
        </Link> */}
      </div>
      <div className={classes.bottomCenter}>
        <Link href="/library">
          <Image
            className={classes.img}
            src="/images/top/library.webp"
            alt="library"
            width={500}
            height={500}
          />
        </Link>
      </div>
    </div>
  );
};
