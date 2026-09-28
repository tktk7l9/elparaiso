// Contact form posting to Google Forms.
// NOTE: the site CSP still has `form-action 'self'`, which blocks this POST; whether to
// allow docs.google.com or send through our own route is an owner decision (SHIG audit A1/A2).

const INPUT_CLASS = "w-full h-11 px-3 border border-gray-400";

export const Contact = () => {
  return (
    <div
      className={
        "max-w-md mx-auto text-base tracking-wide leading-7 px-4 mb-20 text-left motion-safe:animate-fade-in"
      }
    >
      <div>
        <h1 className={"pt-2 text-sm font-normal uppercase tracking-widest text-gray-600 text-center"}>
          CONTACT
        </h1>
        <p className={"pt-4"}>For all order inquires which include but not limited to:</p>
        <p>・Seeding Program</p>
        <p>・International</p>
        <p>・Wholesale</p>
        <p>・Press</p>
        <p>Complete form below:</p>
        <p className={"pt-2 text-sm text-gray-700"}>* Required</p>
      </div>
      <form
        action="https://docs.google.com/forms/u/1/d/e/1FAIpQLSeoZzufLi3L4TEpdHXb-lbfX0dZU7TrxPNibj4dtg2C7ih11A/formResponse"
        target="_self"
        method="POST"
        className={"border-0 m-0 py-4 px-0"}
      >
        <fieldset>
          <legend className={"py-2"}>Name *</legend>
          <div className={"grid grid-cols-2 gap-4"}>
            <p>
              <label className={"block pb-1 text-sm"} htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="entry.1648867423"
                maxLength={100}
                autoComplete="given-name"
                className={INPUT_CLASS}
                required
              />
            </p>
            <p>
              <label className={"block pb-1 text-sm"} htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="entry.2110706354"
                maxLength={100}
                autoComplete="family-name"
                className={INPUT_CLASS}
                required
              />
            </p>
          </div>
        </fieldset>
        <p>
          <label className={"block py-2"} htmlFor="email">
            Mail Address *
          </label>
          <input
            id="email"
            type="email"
            name="entry.854962110"
            maxLength={254}
            autoComplete="email"
            className={INPUT_CLASS}
            required
          />
        </p>
        <p>
          <label className={"block py-2"} htmlFor="subject">
            Subject *
          </label>
          <input
            id="subject"
            type="text"
            name="entry.1485299470"
            maxLength={200}
            className={INPUT_CLASS}
            required
          />
        </p>
        <p>
          <label className={"block py-2"} htmlFor="message">
            Message *
          </label>
          <textarea
            id="message"
            name="entry.421893950"
            maxLength={2000}
            rows={6}
            className={"w-full p-3 border border-gray-400"}
            required
          />
        </p>
        <button
          type="submit"
          className={
            "inline-block my-4 px-8 py-4 text-white bg-gray-800 border-0 text-base leading-5 tracking-normal text-center cursor-pointer appearance-none"
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};
