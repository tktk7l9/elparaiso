import type { ReactNode } from "react";

type PageTitleProps = { children: ReactNode; visuallyHidden?: boolean };

/** One h1 per page, styled like the site's small uppercase labels. */
export const PageTitle = ({ children, visuallyHidden = false }: PageTitleProps) => (
  <h1
    className={
      visuallyHidden
        ? "sr-only"
        : "pt-2 text-sm font-normal uppercase tracking-widest text-gray-600"
    }
  >
    {children}
  </h1>
);
