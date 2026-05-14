import Link from "next/link";
import Image from "next/image";

const CARDS = [
  {
    page: "about",
    src: "/images/top/about.webp",
  },
  {
    page: "melodies",
    src: "/images/top/melodies.webp",
  },
  {
    page: "projects",
    src: "/images/top/projects.webp",
  },
  {
    page: "https://elparaiso.stores.jp/",
    src: "/images/top/store.webp",
  },
  {
    page: "library",
    src: "/images/top/library.webp",
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
