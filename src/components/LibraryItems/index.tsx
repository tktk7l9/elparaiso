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
    <>
      <article className={"text-center mb-20 animate-fade-in"}>
        {ITEMS.map((item) => {
          return (
            <section className={"px-2 py-1"} key={item}>
              <figure>
                <Image
                  src={item}
                  alt={item}
                  width={1200}
                  height={800}
                />
              </figure>
            </section>
          );
        })}
      </article>
    </>
  );
};
