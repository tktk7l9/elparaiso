import Link from "next/link";
import React from "react";

export const Header = () => {
  const PAGES = ["about", "melodies", "projects", "store", "library"];
  return (
    <header className={"w-full h-10 flex justify-center"}>
      {PAGES.map((page) => {
        let pageLink = "/" + page;
        return page === "store" ? (
          <a
            href="https://elparaiso.stores.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className={"inline-block py-4 px-2 hover:text-gray-600"}
            key={page}
          >
            {page}
          </a>
        ) : (
          <Link key={page} href={pageLink}>
            <a className={"inline-block py-4 px-2 hover:text-gray-600"}>
              {page}
            </a>
          </Link>
        );
      })}
    </header>
  );
};
