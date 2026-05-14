import { Playlist } from "src/components/Playlist";

const PLAYLISTS = [
  {
    src: "/images/melodies/playlist0001.webp",
    title: "CURATED MELODIES #1",
    href: "/melodies/playlist",
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
      <iframe
        src="https://open.spotify.com/embed/playlist/1jnkrS9FUGTzZ6nIOuZ0xE"
        width="300"
        height="380"
        allow="encrypted-media"
        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
        className="block m-auto py-2 border-0"
      />
    </div>
  );
};
