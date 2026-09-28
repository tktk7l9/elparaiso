import { Playlist } from "src/components/Playlist";
import { PlaylistDetail } from "src/components/PlaylistDetail";
import { PLAYLISTS, melodiesView } from "src/lib/playlists";

export const Spotify = () => {
  const view = melodiesView(PLAYLISTS);
  if (view.kind === "empty") return null;
  if (view.kind === "detail") return <PlaylistDetail playlist={view.playlist} />;
  return (
    <ul className={"text-center mb-20 motion-safe:animate-fade-in"}>
      {view.playlists.map(({ title, src }) => (
        <li key={title}>
          <Playlist href="/melodies/playlist" src={src} title={title} />
        </li>
      ))}
    </ul>
  );
};
