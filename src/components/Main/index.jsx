import classes from 'src/components/Main/Main.module.css'
import { Cards } from 'src/components/Cards'
import { Spotify } from 'src/components/Spotify'
import { Headline } from 'src/components/Headline'
import { StoreItems } from 'src/components/StoreItems'
import { PlaylistDetail } from 'src/components/PlaylistDetail'

export function Main(props) {
  const page = props.page
  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <Headline page={props.page} />
          { page === 'index'
            ?
              <Cards />
            : page === 'melodies'
            ?
              <Spotify />
            : page === 'store'
            ?
              <StoreItems />
            : page === 'playlist'
            ?
              <PlaylistDetail />
            :
            <div>{page} page is comming soon</div>
          }
      </main>
    </div>
  )
}
