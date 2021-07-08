import Image from "next/image";
import { useState } from "react";
import classes from "src/components/LibraryItems/LibraryItems.module.css";
import { Modal } from "src/components/Modal";

export function LibraryItems() {
  const ITEMS = [];
  for (let i = 1; i < 14; i++) {
    if (i < 10) {
      ITEMS.push({
        src: `/images/library/image000${i}.webp`,
        title: `image000${i}`,
      });
    } else if (i >= 10 && i < 100) {
      ITEMS.push({
        src: `/images/library/image00${i}.webp`,
        title: `image00${i}`,
      });
    }
  }

  const [isShow, setIsShow] = useState(false);
  const openModal = () => setIsShow(true);

  return (
    <>
      <article className={classes.article}>
        {ITEMS.map((item) => {
          return (
            <section className={classes.section} key={item.title}>
              <figure className={classes.figure}>
                <button className={classes.button} onClick={openModal}>
                  <Image
                    className={classes.img}
                    src={item.src}
                    alt={item.title}
                    width={1200}
                    height={800}
                  />
                  {/* <Modal
                    isShow={isShow}
                    setIsShow={setIsShow}
                    src={item.src}
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
}
