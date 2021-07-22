import { Playlist } from "src/components/Playlist";
import playlist0001 from "public/images/melodies/playlist0001.webp";

const PLAYLISTS = [
  {
    src: playlist0001,
    title: "CURATED MELODIES #1",
    href: "/melodies/playlist",
    iframe:
      '<iframe src="https://open.spotify.com/embed/track/564oa00vY05d1uYnTEAAmE" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
  },
];

export const Spotify = () => {
  return (
    <>
      <ul className={"text-center mb-20"}>
        {PLAYLISTS.map(({ title, href, src }) => {
          return (
            <li key={title}>
              <Playlist href={href} src={src} title={title} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
