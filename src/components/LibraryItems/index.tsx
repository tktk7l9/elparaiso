import Image from "next/image";

const ITEMS = [
  "/images/library/image0001.webp",
  "/images/library/image0002.webp",
  "/images/library/image0003.webp",
  "/images/library/image0004.webp",
  "/images/library/image0005.webp",
  "/images/library/image0006.webp",
  "/images/library/image0007.webp",
  "/images/library/image0008.webp",
  "/images/library/image0009.webp",
  "/images/library/image0010.webp",
  "/images/library/image0011.webp",
  "/images/library/image0012.webp",
  "/images/library/image0013.webp",
];

export const LibraryItems = () => {
  return (
    <article
      className={
        "px-2 mb-20 animate-fade-in columns-1 sm:columns-2 lg:columns-3 gap-2"
      }
    >
      {ITEMS.map((item, index) => {
        const isFirst = index === 0;
        return (
          <figure key={item} className="mb-2 break-inside-avoid">
            <Image
              src={item}
              alt={item}
              width={1024}
              height={682}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={isFirst}
              loading={isFirst ? "eager" : "lazy"}
              className="w-full h-auto"
            />
          </figure>
        );
      })}
    </article>
  );
};
