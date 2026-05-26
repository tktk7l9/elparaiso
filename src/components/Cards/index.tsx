import Image from "next/image";
import Link from "next/link";

const CARDS = [
  { page: "about", src: "/images/top/about.webp" },
  { page: "melodies", src: "/images/top/melodies.webp" },
  { page: "projects", src: "/images/top/projects.webp" },
  { page: "https://elparaiso.stores.jp/", src: "/images/top/store.webp" },
  { page: "library", src: "/images/top/library.webp" },
];

const SIZE = 300;
const SIZES = "(min-width: 768px) 33vw, 100vw";

type CardImageProps = {
  src: string;
  alt: string;
  priority: boolean;
};

const CardImage = ({ src, alt, priority }: CardImageProps) => (
  <Image
    src={src}
    alt={alt}
    width={SIZE}
    height={SIZE}
    sizes={SIZES}
    priority={priority}
    loading={priority ? "eager" : "lazy"}
  />
);

export const Cards = () => {
  return (
    <div
      className={
        "text-center py-4 mb-20 md:grid grid-cols-3 gap-4 md:px-20 2xl:gap-20 2xl:px-96 animate-fade-in"
      }
    >
      {CARDS.map(({ page, src }, idx) => {
        const isExternal = page.startsWith("http");
        const priority = idx === 0;
        if (isExternal) {
          return (
            <a
              key={page}
              href={page}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <CardImage src={src} alt={page} priority={priority} />
              </div>
            </a>
          );
        }
        return (
          <Link key={page} href={`/${page}`}>
            <div>
              <CardImage src={src} alt={page} priority={priority} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};
