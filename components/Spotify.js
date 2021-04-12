import Link from 'next/link'
import classes from './Spotify.module.css'

export function Spotify() {
  const ITEMS = [
    {
      src: '',
      title: 'Herside Story',
      artist: 'GoldLink, Hare Squead',
      href: '',
      iframe: '<iframe src="https://open.spotify.com/embed/track/564oa00vY05d1uYnTEAAmE" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
    },
    {
      src: '',
      title: 'Miss Shiney',
      artist: 'Kaiit',
      href: '',
      iframe: '<iframe src="https://open.spotify.com/embed/track/4QnKrqFiQwzKXOJ5sOk53u" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
    },
    {
      src: '',
      title: 'Home',
      artist: 'llla J',
      href: '',
      iframe: '<iframe src="https://open.spotify.com/embed/track/518FKJJtEHXEw5I93FWYKu" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
    },
    {
      src: '',
      title: 'I Found My Smil Again (Radio Edit)',
      artist: 'ディアンジェロ',
      href: '',
      iframe: '<iframe src="https://open.spotify.com/embed/track/3uq6qe8ouF012GLOcLyWcH" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
    }
  ]

  return (
    <ul className={classes.list}>
      {ITEMS.map((item) => {
        return (
          <li key={item.href}>
            <Link href="/playlist">
              <img
                src="images/melodies/playlist0001.jpg"
                className={classes.item}
              />
            </Link>
            <p>{item.title}</p>
            <p>{item.artist}</p>
          </li>
        )
      })}
    </ul>
  )
}
