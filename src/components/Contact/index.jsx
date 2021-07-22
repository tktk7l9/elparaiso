export const Contact = () => {
  return (
    <div className={"text-xs tracking-wider leading-6 px-2 mb-20 text-left"}>
      <div>
        <p>CONTACT</p>
        <p>For all order inquires which include but not limited to:</p>
        <p>・Seeding Program</p>
        <p>・International</p>
        <p>・Wholesale</p>
        <p>・Press</p>
        <p>Complete form below:</p>
      </div>
      <form
        action="https://docs.google.com/forms/u/1/d/e/1FAIpQLSeoZzufLi3L4TEpdHXb-lbfX0dZU7TrxPNibj4dtg2C7ih11A/formResponse"
        target="_self"
        method="POST"
        id="mG61Hd"
        jsmodel="TOfxwf Q91hve"
        data-response="%.@.[]]"
        data-first-entry="0"
        data-last-entry="5"
        data-is-first-page="true"
        className={"border-0 m-0 py-4 px-0"}
      >
        <div>
          <p>Name *</p>
          <p className={"inline-block py-1"}>
            <input
              id="firstName"
              type="text"
              name="entry.1648867423"
              className={"w-full h-10 p-1 border border-gray-400"}
              required
            />
            <label className={"block py-1"} htmlFor="firstName">
              First Name
            </label>
          </p>
          <p className={"inline-block pl-4 border-gray-800"}>
            <input
              id="lastName"
              type="text"
              name="entry.2110706354"
              className={"w-full h-10 p-4 border border-gray-400"}
              required
            />
            <label className={"block py-1"} htmlFor="lastName">
              Last Name
            </label>
          </p>
        </div>
        <p>
          <label className={"block py-2"} htmlFor="email">
            Mail Address *
          </label>
          <input
            id="email"
            type="email"
            name="entry.854962110"
            className={"w-80 h-10 p-4 border border-gray-400"}
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
            className={"w-80 h-10 p-4 border border-gray-400"}
            required
          />
        </p>
        <p>
          <label className={"block py-2"} htmlFor="message">
            Message *
          </label>
          <textarea
            id="message"
            className={"w-80 h-full p-4 border border-gray-400"}
            name="entry.421893950"
          ></textarea>
        </p>
        <button
          type="submit"
          className={
            "inline-block my-4 px-8 py-4 text-white bg-gray-800 border-0 text-xs leading-4 tracking-normal text-center	cursor-pointer appearance-none"
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};
