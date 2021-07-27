import { Cards } from "src/components/Cards";
import { About } from "src/components/About";
import { Spotify } from "src/components/Spotify";
import { Headline } from "src/components/Headline";
import { LibraryItems } from "src/components/LibraryItems";
import { PlaylistDetail } from "src/components/PlaylistDetail";
import { Contact } from "src/components/Contact";

export const Main = (props) => {
  return (
    <>
      <main className={"text-center"}>
        <Headline page={props.page} />
        {props.page === "index" ? (
          <Cards />
        ) : props.page === "about" ? (
          <About />
        ) : props.page === "melodies" ? (
          <Spotify />
        ) : props.page === "playlist" ? (
          <PlaylistDetail />
        ) : props.page === "library" ? (
          <LibraryItems />
        ) : props.page === "contact" ? (
          <Contact />
        ) : (
          <div className={"pt-10 pb-64 lg:pb-96 lg:text-2xl animate-fade-in"}>
            {props.page} page is coming soon
          </div>
        )}
      </main>
    </>
  );
};
