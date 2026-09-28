import Image from "next/image";
import Link from "next/link";
import { ExternalMark } from "src/components/ExternalMark";
import { NAV_ITEMS, cardAlt } from "src/lib/nav";

// Top-page cards, in display order. Destinations come from the shared nav.
const CARD_IMAGES: readonly (readonly [label: string, src: string])[] = [
  ["about", "/images/top/about.webp"],
  ["melodies", "/images/top/melodies.webp"],
  ["projects", "/images/top/projects.webp"],
  ["store", "/images/top/store.webp"],
  ["library", "/images/top/library.webp"],
];

const CARDS = CARD_IMAGES.map(([label, src]) => {
  const item = NAV_ITEMS.find((nav) => nav.label === label);
  if (!item) throw new Error(`No nav item for card "${label}"`);
  return { ...item, src };
});

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
    className="mx-auto"
  />
);

export const Cards = () => {
  return (
    <div
      className={
        "text-center py-4 mb-20 md:grid grid-cols-3 gap-4 md:px-20 2xl:gap-20 2xl:px-96 motion-safe:animate-fade-in"
      }
    >
      {CARDS.map(({ label, href, external, src }, idx) => {
        const priority = idx === 0;
        const alt = cardAlt({ label, external });
        if (external) {
          // Unlike internal cards, say in text that this one leaves the site.
          return (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block">
              <CardImage src={src} alt={alt} priority={priority} />
              <span aria-hidden="true" className="block py-1 text-sm tracking-wider">
                {label}
                <ExternalMark />
              </span>
            </a>
          );
        }
        return (
          <Link key={label} href={href} className="block">
            <CardImage src={src} alt={alt} priority={priority} />
          </Link>
        );
      })}
    </div>
  );
};
