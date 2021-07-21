import Image from "next/image";
import { useState } from "react";
import { Modal } from "src/components/Modal";
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

export const LibraryItems = () => {
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

  const [isShow, setIsShow] = useState(false);
  const openModal = () => setIsShow(true);

  return (
    <>
      <article>
        {ITEMS.map((item) => {
          return (
            <section className={"p-4"} key={item.src}>
              <figure>
                <button onClick={openModal}>
                  <Image src={item} alt={item.src} placeholder="blur" />
                  {/* <Modal
                    isShow={isShow}
                    setIsShow={setIsShow}
                    src={item}
                    title={item.title}
                  /> */}
                </button>
              </figure>
            </section>
          );
        })}
      </article>
    </>
  );
};
