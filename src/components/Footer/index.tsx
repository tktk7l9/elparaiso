import Link from "next/link";
import { ExternalMark } from "src/components/ExternalMark";
import { STORE_URL } from "src/lib/nav";

const LINKS = [
  { href: "https://www.instagram.com/elparaisojp/", title: "Instagram", external: true },
  { href: STORE_URL, title: "Store", external: true },
  {
    href: "https://open.spotify.com/playlist/1jnkrS9FUGTzZ6nIOuZ0xE?si=70f4ef6442fb48f2",
    title: "Spotify",
    external: true,
  },
  { href: "/contact", title: "Contact", external: false },
];

// Links are blocks with vertical padding so each target is at least 44px tall.
const LINK_CLASS = "block px-4 py-3 hover:text-gray-500";

export const Footer = () => {
  return (
    <footer className={"text-sm tracking-wider leading-5 pt-4 pb-24 bg-gray-100"}>
      <div className={"px-4 py-3"}>Culture & Policy</div>
      <ul>
        {LINKS.map(({ href, title, external }) => (
          <li key={title}>
            {external ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                {title}
                <ExternalMark />
              </a>
            ) : (
              <Link href={href} className={LINK_CLASS}>
                {title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </footer>
  );
};
