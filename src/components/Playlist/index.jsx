import classes from "src/components/Playlist/Playlist.module.css";
import Image from "next/image";
import Link from "next/link";

export const Playlist = (props) => {
  const { href, src, title } = props;
  return (
    <>
      <Link href={href}>
        <Image
          className={classes.img}
          src={src}
          alt={title}
          width={300}
          height={300}
        />
      </Link>
      <p className={classes.p}>{title}</p>
    </>
  );
};
