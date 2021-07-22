import Image from "next/image";
import image0001 from "public/images/library/image0001.webp";
import image0002 from "public/images/library/image0002.webp";
import image0003 from "public/images/library/image0003.webp";
import image0004 from "public/images/library/image0004.webp";
import image0005 from "public/images/library/image0005.webp";
import image0006 from "public/images/library/image0006.webp";
import image0007 from "public/images/library/image0007.webp";
import image0008 from "public/images/library/image0008.webp";
import image0009 from "public/images/library/image0009.webp";
import image0010 from "public/images/library/image0010.webp";
import image0011 from "public/images/library/image0011.webp";
import image0012 from "public/images/library/image0012.webp";
import image0013 from "public/images/library/image0013.webp";

const ITEMS = [
  image0001,
  image0002,
  image0003,
  image0004,
  image0005,
  image0006,
  image0007,
  image0008,
  image0009,
  image0010,
  image0011,
  image0012,
  image0013,
];

export const LibraryItems = () => {
  return (
    <>
      <article className={"text-center mb-20"}>
        {ITEMS.map((item) => {
          return (
            <section className={"px-2 py-1"} key={item.src}>
              <figure>
                <Image
                  src={item}
                  alt={item.src}
                  width={1200}
                  height={800}
                  placeholder="blur"
                />
              </figure>
            </section>
          );
        })}
      </article>
    </>
  );
};
