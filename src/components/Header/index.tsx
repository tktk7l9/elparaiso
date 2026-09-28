"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalMark } from "src/components/ExternalMark";
import { NAV_ITEMS, isCurrentPage } from "src/lib/nav";

const LINK_CLASS =
  "inline-block py-3 px-1.5 sm:px-2 underline-offset-4 decoration-2 hover:text-gray-600";

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className={"w-full"}>
      <nav aria-label="メイン">
        <ul className={"flex flex-wrap justify-center"}>
          {NAV_ITEMS.map(({ label, href, external }) => {
            if (external) {
              return (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                    {label}
                    <ExternalMark />
                  </a>
                </li>
              );
            }
            const current = isCurrentPage(pathname, href);
            return (
              <li key={label}>
                <Link
                  href={href}
                  aria-current={current ? "page" : undefined}
                  className={`${LINK_CLASS} ${current ? "underline font-semibold" : ""}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
