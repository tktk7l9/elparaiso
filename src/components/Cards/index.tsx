import Link from "next/link";
import Image from "next/image";
import about from "public/images/top/about.webp";
import melodies from "public/images/top/melodies.webp";
import projects from "public/images/top/projects.webp";
import store from "public/images/top/store.webp";
import library from "public/images/top/library.webp";

const CARDS = [
  {
    page: "about",
    src: about,
  },
  {
    page: "melodies",
    src: melodies,
  },
  {
    page: "projects",
    src: projects,
  },
  {
    page: "https://elparaiso.stores.jp/",
    src: store,
  },
  {
    page: "library",
    src: library,
  },
];

function ExternalLink(externalLink, imageSrc, imageSize) {
  return (
    <a
      href={externalLink}
      target="_blank"
      rel="noopener noreferrer"
      key={externalLink}
    >
      <div>
        <Image
          src={imageSrc}
          alt={externalLink}
          placeholder="blur"
          width={imageSize}
          height={imageSize}
        />
      </div>
    </a>
  );
}

function InternalLink(internalLink, imageSrc, imageSize) {
  const href = `/${internalLink}`;
  return (
    <Link href={href} key={internalLink} passHref>
      <div>
        <Image
          src={imageSrc}
          alt={internalLink}
          placeholder="blur"
          width={imageSize}
          height={imageSize}
        />
      </div>
    </Link>
  );
}

export const Cards = () => {
  const size = 300;
  return (
    <div
      className={
        "text-center py-4 mb-20 md:grid grid-cols-3 gap-4 md:px-20 2xl:gap-20 2xl:px-96 animate-fade-in"
      }
    >
      {CARDS.map(({ page, src }) => {
        return page.startsWith("http")
          ? ExternalLink(page, src, size)
          : InternalLink(page, src, size);
      })}
    </div>
  );
};
