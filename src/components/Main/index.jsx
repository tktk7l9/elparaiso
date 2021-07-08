import classes from "src/components/Main/Main.module.css";
import { Cards } from "src/components/Cards";
import { About } from "src/components/About";
import { Spotify } from "src/components/Spotify";
import { Headline } from "src/components/Headline";
import { StoreItems } from "src/components/StoreItems";
import { LibraryItems } from "src/components/LibraryItems";
import { PlaylistDetail } from "src/components/PlaylistDetail";
import { Contact } from "src/components/Contact";

export const Main = (props) => {
  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <Headline page={props.page} />
        {props.page === "index" ? (
          <Cards />
        ) : props.page === "about" ? (
          <About />
        ) : props.page === "melodies" ? (
          <Spotify />
        ) : props.page === "playlist" ? (
          <PlaylistDetail />
        ) : props.page === "store" ? (
          <StoreItems />
        ) : props.page === "library" ? (
          <LibraryItems />
        ) : props.page === "contact" ? (
          <Contact />
        ) : (
          <div className={classes.comingsoon}>
            {props.page} page is coming soon
          </div>
        )}
      </main>
    </div>
  );
};
