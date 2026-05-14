import { Playlist } from "src/components/Playlist";

const PLAYLISTS = [
  {
    src: "/images/melodies/playlist0001.webp",
    title: "CURATED MELODIES #1",
    href: "/melodies/playlist",
  },
];

export const Spotify = () => {
  return (
    <>
      <ul className={"text-center mb-20 animate-fade-in"}>
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
