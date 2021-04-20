import classes from 'src/components/Contact/Contact.module.css'

export function Contact() {
  return (
    <div className={classes.container}>
      <div className={classes.description}>
        <p>CONTACT</p>
        <p>
          For all order inquires which include but not limited to:
        </p>
        <p>・Seeding Program</p>
        <p>・International</p>
        <p>・Wholesale</p>
        <p>・Press</p>
        <p>Complete form below:</p>
      </div>
      <form
        action="https://docs.google.com/forms/u/1/d/e/1FAIpQLScuMQAE-Bq0Jti9z5BkPluzLEBADBJmwXi_d2ksRN0-DsSroQ/formResponse"
        target="_self"
        method="POST"
        id="mG61Hd"
        jsmodel="TOfxwf Q91hve"
        data-response="%.@.[]]"
        data-first-entry="0"
        data-last-entry="5"
        data-is-first-page="true"
        className={classes.form}
      >
        <div>
        <p className={classes.name}>Name *</p>
          <p className={classes.ninput}>
            <input
              id="firstName"
              type="text"
              name="entry.1648867423"
              className={classes.ntext}
              required
            />
            <label 
              className={classes.label}
              htmlFor="firstName"
            >First Name</label>
          </p>
          <p id={classes.pLastName} className={classes.ninput}>
            <input
              id="lastName"
              type="text"
              name="entry.2110706354"
              className={classes.ntext}
              required
            />
            <label
              className={classes.label}
              htmlFor="lastName">Last Name</label>
          </p>
        </div>
        <p className={classes.input}>
          <label
            className={classes.label}
            htmlFor="email">Mail Address *</label>
          <input
            id="email"
            type="email"
            name="entry.854962110"
            className={classes.text}
            required
          />
        </p>
        <p className={classes.input}>
          <label
            className={classes.label}
            htmlFor="subject">Subject *</label>
          <input
            id="subject"
            type="text"
            name="entry.1485299470"
            className={classes.text}
            required
          />
        </p>
        <p className={classes.input}>
          <label
            className={classes.label}
            htmlFor="message">Message *</label>
          <textarea
            id="message"
            className={classes.textarea}
            name="entry.421893950"
          >
          </textarea>
        </p>
        <button
          type="submit"
          className={classes.btn}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
