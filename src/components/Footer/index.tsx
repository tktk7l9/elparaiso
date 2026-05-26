import Link from "next/link";
import React from "react";

export const Footer = () => {
  const LINKS = [
    {
      href: "https://www.instagram.com/elparaisojp/",
      title: "Instagram",
      isInnerLink: false,
    },
    {
      href: "https://elparaiso.stores.jp/",
      title: "Store",
      isInnerLink: false,
    },
    {
      href: "https://open.spotify.com/playlist/1jnkrS9FUGTzZ6nIOuZ0xE?si=70f4ef6442fb48f2",
      title: "Spotify",
      isInnerLink: false,
    },
    {
      href: "/contact",
      title: "Contact",
      isInnerLink: true,
    },
  ];
  return (
    <footer
      className={
        "list-item text-xs tracking-wider leading-6 pt-5 py-5 pb-24 bg-gray-100"
      }
    >
      <div className={"px-4 py-1"}>Culture & Policy</div>
      {LINKS.map(({ href, title, isInnerLink }) => {
        return (
          <div key={title} className={"px-4 py-1 hover:text-gray-500"}>
            {isInnerLink ? (
              <Link href={href}>{title}</Link>
            ) : (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            )}
          </div>
        );
      })}
    </footer>
  );
};
