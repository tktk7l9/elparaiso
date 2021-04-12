import classes from './Main.module.css'
import { Cards } from '../components/Cards'
import { Spotify } from '../components/Spotify'
import { Headline } from '../components/Headline'
import { StoresItems } from './StoresItems'

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
              <StoresItems />
            :
            <div>{page} page is comming soon</div>
          }
      </main>
    </div>
  )
}
