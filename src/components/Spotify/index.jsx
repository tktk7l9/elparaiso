import classes from "src/components/Spotify/Spotify.module.css";
import { Playlist } from "src/components/Playlist";

export function Spotify() {
  const PLAYLISTS = [
    {
      src: "/images/melodies/playlist0001.webp",
      title: "CURATED MELODIES #1",
      href: "/playlist",
      iframe:
        '<iframe src="https://open.spotify.com/embed/track/564oa00vY05d1uYnTEAAmE" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
    },
  ];

  return (
    <>
      <ul className={classes.ul}>
        {PLAYLISTS.map((playlist) => {
          const { title, href, src } = playlist;
          return (
            <li key={title}>
              <Playlist href={href} src={src} title={title} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
