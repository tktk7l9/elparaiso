import classes from 'src/components/PlaylistDetail/PlaylistDetail.module.css'

export function PlaylistDetail() {
  return (
    <div>
      <p>CURATED MELODIES #1</p>
      <p>Herside Story</p>
      <p>GoldLink, Hare Squead</p>
      <iframe
        src="https://open.spotify.com/embed/track/564oa00vY05d1uYnTEAAmE"
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      >
      </iframe>
      <iframe
        src="https://open.spotify.com/embed/playlist/1jnkrS9FUGTzZ6nIOuZ0xE"
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      >
      </iframe>
    </div>
  )
}
