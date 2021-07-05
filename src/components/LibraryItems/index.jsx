import Image from "next/image";
import classes from "src/components/LibraryItems/LibraryItems.module.css";

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

  return (
    <>
      <article className={classes.article}>
        {ITEMS.map((item) => {
          return (
            <section className={classes.section} key={item.title}>
              <figure className={classes.figure}>
                <a className={classes.a} href="#">
                  <Image
                    className={classes.img}
                    src={item.src}
                    alt={item.title}
                    width={1200}
                    height={800}
                  />
                </a>
              </figure>
            </section>
          );
        })}
      </article>
    </>
  );
}
