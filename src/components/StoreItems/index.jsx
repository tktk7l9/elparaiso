import Image from "next/image";
import classes from "src/components/StoreItems/StoreItems.module.css";

export const StoreItems = () => {
  const ITEMS = [
    {
      // src: "images/stores/item0011.webp",
      src: "https://p1-e6eeae93.imageflux.jp/c!/f=webp:auto,a=2,w=460,h=460,b=ffffff00/elparaiso/a4cc3e85e8809ebfc3a6.jpeg",
      title: "SUNRISE LONG SLEEVE TEE",
      price: "6000",
      href: "https://elparaiso.stores.jp/items/6062c74523055725974f2873",
      available: false,
    },
    {
      src: "https://p1-e6eeae93.imageflux.jp/c!/f=webp:auto,a=2,w=460,h=460,b=ffffff00/elparaiso/78bd589562b49a48c104.jpeg",
      title: "SUNRISE SHORT SLEEVE TEE",
      price: "4500",
      href: "https://elparaiso.stores.jp/items/6062c7eed5e9c96aa70fbe7a",
      available: true,
    },
    {
      src: "https://p1-e6eeae93.imageflux.jp/c!/f=webp:auto,a=2,w=460,h=460,b=ffffff00/elparaiso/357d2e4826e9460de63e.jpeg",
      title: "SPRING BOARDER LONG SLEEVE POCKET TEE",
      price: "6000",
      href: "https://elparaiso.stores.jp/items/6062c5f1d263f0309b068ff9",
      available: true,
    },
    {
      src: "https://p1-e6eeae93.imageflux.jp/c!/f=webp:auto,a=2,w=460,h=460,b=ffffff00/elparaiso/cd8ddedb2b5d4665b60f.jpg",
      title: "SPRING BOARDER SHORT SLEEVE POCKET TEE",
      price: "4500",
      href: "https://elparaiso.stores.jp/items/6062ca7123055725974f2956",
      available: false,
    },
    {
      src: "https://p1-e6eeae93.imageflux.jp/c!/f=webp:auto,a=2,w=460,h=460,b=ffffff00/elparaiso/e1155e6c97e40fb590c5.jpg",
      title: "EL PARAISO LOGO SPRING SHORT SLEEVE TEE",
      price: "5000",
      href: "https://elparaiso.stores.jp/items/6062c9bed263f0303e069186",
      available: true,
    },
    {
      src: "https://p1-e6eeae93.imageflux.jp/c!/f=webp:auto,a=2,w=460,h=460,b=ffffff00/elparaiso/c59c2d1e4f90c1ac15f2.jpg",
      title: "SPRING EARTH SHORT SLEEVE TEE",
      price: "4500",
      href: "https://elparaiso.stores.jp/items/6062c8e41e746b79ba9b56e8",
      available: true,
    },
    {
      src: "https://p1-e6eeae93.imageflux.jp/c!/f=webp:auto,a=2,w=460,h=460,b=ffffff00/elparaiso/d8bcb73cb09a3a881319.jpg",
      title: "SPRING PASTEL SHORT SLEEVE TEE",
      price: "4500",
      href: "https://elparaiso.stores.jp/items/6062c865d5e9c96a810fbeb8",
      available: true,
    },
    {
      src: "https://p1-e6eeae93.imageflux.jp/c!/f=webp:auto,a=2,w=460,h=460,b=ffffff00/elparaiso/0f51b0eb377af11b42c5.jpg",
      title: "SPRING WARM COLORED BANDANA",
      price: "1000",
      href: "https://elparaiso.stores.jp/items/6062d330d5e9c96aa70fc199",
      available: true,
    },
    {
      src: "https://p1-e6eeae93.imageflux.jp/c!/f=webp:auto,a=2,w=460,h=460,b=ffffff00/elparaiso/b180b107a2ac9b2234e6.jpg",
      title: "SPRING COLD COLORED BANDANA",
      price: "1000",
      href: "https://elparaiso.stores.jp/items/6062d421a87fc501cb2b33d5",
      available: true,
    },
    {
      src: "https://p1-e6eeae93.imageflux.jp/c!/f=webp:auto,a=2,w=460,h=460,b=ffffff00/elparaiso/00e93b92848bdc3b1b98.jpg",
      title: "SPRING WARM COLORED SOCKS",
      price: "1000",
      href: "https://elparaiso.stores.jp/items/6062d3c7d5e9c96a330fc184",
      available: true,
    },
    {
      src: "https://p1-e6eeae93.imageflux.jp/c!/f=webp:auto,a=2,w=460,h=460,b=ffffff00/elparaiso/2084803b59a06bda4853.jpg",
      title: "SPRING COLD COLORED SOCKS",
      price: "1000",
      href: "https://elparaiso.stores.jp/items/6062d45bd5e9c96a330fc1c6",
      available: true,
    },
  ];

  function changeYen(price) {
    return Number(price).toLocaleString("ja-JP", {
      style: "currency",
      currency: "JPY",
    });
  }

  return (
    <ul className={classes.list}>
      {ITEMS.map((item) => {
        const available = item.available;
        const yen = changeYen(item.price);
        return (
          <li key={item.href}>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              <Image
                width={400}
                height={400}
                src={item.src}
                className={classes.item}
              />
            </a>
            <p>{item.title}</p>
            {available ? <p>{yen}</p> : <p>SOLD OUT</p>}
          </li>
        );
      })}
    </ul>
  );
};
