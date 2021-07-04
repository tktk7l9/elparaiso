import classes from "src/components/PlaylistDetail/PlaylistDetail.module.css";
import Image from "next/image";

export function PlaylistDetail() {
  return (
    <>
      <Image
        className={classes.img}
        src="/images/melodies/playlist0001.webp"
        alt="CURATED MELODIES #1"
        width={300}
        height={300}
      />
      <p className={classes.p}>CURATED MELODIES #1</p>
      <iframe
        src="https://open.spotify.com/embed/playlist/1jnkrS9FUGTzZ6nIOuZ0xE"
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        className={classes.iframe}
      ></iframe>
    </>
  );
}
