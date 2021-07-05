import classes from "src/components/Main/Main.module.css";
import { Cards } from "src/components/Cards";
import { About } from "src/components/About";
import { Spotify } from "src/components/Spotify";
import { Headline } from "src/components/Headline";
import { StoreItems } from "src/components/StoreItems";
import { LibraryItems } from "src/components/LibraryItems";
import { PlaylistDetail } from "src/components/PlaylistDetail";
import { Contact } from "src/components/Contact";

export function Main(props) {
  const page = props.page;
  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <Headline page={props.page} />
        {page === "index" ? (
          <Cards />
        ) : page === "about" ? (
          <About />
        ) : page === "melodies" ? (
          <Spotify />
        ) : page === "playlist" ? (
          <PlaylistDetail />
        ) : page === "store" ? (
          <StoreItems />
        ) : page === "library" ? (
          <LibraryItems />
        ) : page === "contact" ? (
          <Contact />
        ) : (
          <div className={classes.comingsoon}>{page} page is coming soon</div>
        )}
      </main>
    </div>
  );
}
