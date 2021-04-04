import classes from './Cards.module.css'

export function Cards() {
  return (
    <div className={classes.grid}>
      <div className={classes.topLeft}>
        <img src="images/post24.jpg"/>
      </div>
      <div className={classes.topCenter}>
        <img src="images/post23.jpg"/>
      </div>
      <div className={classes.topRight}>
        <img src="images/post22.jpg"/>
      </div>
      <div className={classes.centerLeft}>
        <img src="images/post21.jpg"/>
      </div>
      <div className={classes.centerCenter}>
        <img src="images/post19.jpg"/>
      </div>
      <div className={classes.centerRight}>
        <img src="images/post18.jpg"/>
      </div>
      <div className={classes.bottomLeft}>
        <img src="images/post17.jpg"/>
      </div>
      <div className={classes.bottomCenter}>
        <img src="images/post16.jpg"/>
      </div>
      <div className={classes.bottomRight}>
        <img src="images/post15.jpg"/>
      </div>
    </div>
  )
}
