import Link from "next/link";
import Image from "next/image";
import classes from "src/components/Spotify/Spotify.module.css";

export function Spotify() {
  const ITEMS = [
    {
      src: "/images/melodies/playlist0001.webp",
      href: "/playlist",
      title: "CURATED MELODIES #1",
      iframe:
        '<iframe src="https://open.spotify.com/embed/track/564oa00vY05d1uYnTEAAmE" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
    },
  ];

  return (
    <>
      <ul className={classes.ul}>
        {ITEMS.map((item) => {
          return (
            <li key={item.title}>
              <Link href={item.href} src={item.src}>
                <Image
                  className={classes.img}
                  src={item.src}
                  alt={item.title}
                  width={300}
                  height={300}
                />
              </Link>
              <p className={classes.p}>{item.title}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
