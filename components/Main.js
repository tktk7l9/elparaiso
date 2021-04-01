import classes from './Main.module.css'
import { Links } from '../components/Links'
import { Headline } from '../components/Headline'

export function Main(props) {
  return (
      <main className={classes.main}>
        <Headline page={props.page}>
          <code className={classes.code}>
            {props.page}
          </code>
        </Headline>
        <Links />
      </main>
  )
}
