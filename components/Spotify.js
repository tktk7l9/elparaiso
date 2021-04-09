import classes from './Spotify.module.css'

export function Spotify() {
  return (
    <div className={classes.grid}>
      <div className={classes.topLeft}>
        <iframe src="https://open.spotify.com/embed/playlist/1jnkrS9FUGTzZ6nIOuZ0xE" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
      <div className={classes.topCenter}>
        <iframe src="https://open.spotify.com/embed/playlist/1jnkrS9FUGTzZ6nIOuZ0xE" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
      <div className={classes.topRight}>
        <iframe src="https://open.spotify.com/embed/playlist/1jnkrS9FUGTzZ6nIOuZ0xE" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
      <div className={classes.bottomLeft}>
        <iframe src="https://open.spotify.com/embed/playlist/1jnkrS9FUGTzZ6nIOuZ0xE" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
      <div className={classes.bottomCenter}>
        <iframe src="https://open.spotify.com/embed/playlist/1jnkrS9FUGTzZ6nIOuZ0xE" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
      <div className={classes.bottomRight}>
        <iframe src="https://open.spotify.com/embed/playlist/1jnkrS9FUGTzZ6nIOuZ0xE" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
    </div>
  )
}
