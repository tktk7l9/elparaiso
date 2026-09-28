import { EXTERNAL_NOTE } from "src/lib/nav";

/** Visible arrow plus a screen-reader note for links that open another site in a new tab. */
export const ExternalMark = () => (
  <>
    <span aria-hidden="true" className="ml-0.5 text-[0.8em]">
      ↗
    </span>
    <span className="sr-only">{EXTERNAL_NOTE}</span>
  </>
);
