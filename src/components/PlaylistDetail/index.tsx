import { ExternalMark } from "src/components/ExternalMark";
import { Playlist } from "src/components/Playlist";
import type { PlaylistData } from "src/lib/playlists";

export const PlaylistDetail = ({ playlist }: { playlist: PlaylistData }) => {
  return (
    <div className={"mb-20 motion-safe:animate-fade-in"}>
      <Playlist src={playlist.src} title={playlist.title} />
      <iframe
        src={playlist.embedUrl}
        width="300"
        height="380"
        loading="lazy"
        allow="encrypted-media"
        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
        className="block m-auto py-2 border-0"
        title={`Spotify ${playlist.title}`}
      />
      {/* Always offer a way to listen, even when the embed cannot load. */}
      <a
        href={playlist.openUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={"inline-block px-4 py-3 underline underline-offset-4"}
      >
        Spotifyで聴く
        <ExternalMark />
      </a>
    </div>
  );
};
