import Link from "next/link";

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

function ExternalLink(externalLink, imageSrc, imageSize, priority) {
  return (
    <a
      href={externalLink}
      target="_blank"
      rel="noopener noreferrer"
      key={externalLink}
    >
      <div>
        <img
          src={imageSrc}
          alt={externalLink}
          width={imageSize}
          height={imageSize}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </div>
    </a>
  );
}

function InternalLink(internalLink, imageSrc, imageSize, priority) {
  const href = `/${internalLink}`;
  return (
    <Link href={href} key={internalLink} prefetch={false}>
      <div>
        <img
          src={imageSrc}
          alt={internalLink}
          width={imageSize}
          height={imageSize}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
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
      {CARDS.map(({ page, src }, idx) => {
        const priority = idx < 3;
        return page.startsWith("http")
          ? ExternalLink(page, src, size, priority)
          : InternalLink(page, src, size, priority);
      })}
    </div>
  );
};
