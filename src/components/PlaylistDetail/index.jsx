import Iframe from "react-iframe";
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

export const PlaylistDetail = () => {
  return (
    <div className={"mb-20 animate-fade-in"}>
      <Playlist
        href={PLAYLISTS[0].href}
        src={PLAYLISTS[0].src}
        title={PLAYLISTS[0].title}
      />
      <Iframe
        src="https://open.spotify.com/embed/playlist/1jnkrS9FUGTzZ6nIOuZ0xE"
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        className={"block m-auto py-2"}
      />
    </div>
  );
};
