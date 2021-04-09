import classes from './Main.module.css'
import { Cards } from '../components/Cards'
import { Spotify } from '../components/Spotify'
import { Links } from '../components/Links'
import { Headline } from '../components/Headline'

export function Main(props) {
  return (
    <div className={classes.container}>
      { props.page === "index"
        ?
        <main className={classes.main}>
          <Headline page={props.page}>
          </Headline>
          <Cards />
        </main>
        :
        <main className={classes.main}>
          <Headline page={props.page}>
            <code className={classes.code}>
              {props.page}
            </code>
          </Headline>
          <Spotify />
        </main>
      }
    </div>
  )
}
