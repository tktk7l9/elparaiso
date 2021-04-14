import classes from 'src/components/StoreItems/StoreItems.module.css'

export function StoreItems() {
  const ITEMS = [
    {
      src: "images/stores/item0011.webp",
      title: "SUNRISE LONG SLEEVE TEE",
      price: "6000",
      href: "https://elparaiso.stores.jp/items/6062c74523055725974f2873",
      available: false
    },
    {
      src: "images/stores/item0010.webp",
      title: "SUNRISE SHORT SLEEVE TEE",
      price: "4500",
      href: "https://elparaiso.stores.jp/items/6062c7eed5e9c96aa70fbe7a",
      available: true
    },
    {
      src: "images/stores/item0009.webp",
      title: "SPRING BOARDER LONG SLEEVE POCKET TEE",
      price: "6000",
      href: "https://elparaiso.stores.jp/items/6062c5f1d263f0309b068ff9",
      available: true
    },
    {
      src: "images/stores/item0008.webp",
      title: "SPRING BOARDER SHORT SLEEVE POCKET TEE",
      price: "4500",
      href: "https://elparaiso.stores.jp/items/6062ca7123055725974f2956",
      available: false
    },
    {
      src: "images/stores/item0007.webp",
      title: "EL PARAISO LOGO SPRING SHORT SLEEVE TEE",
      price: "5000",
      href: "https://elparaiso.stores.jp/items/6062c9bed263f0303e069186",
      available: true
    },
    {
      src: "images/stores/item0006.webp",
      title: "SPRING EARTH SHORT SLEEVE TEE",
      price: "4500",
      href: "https://elparaiso.stores.jp/items/6062c8e41e746b79ba9b56e8",
      available: true
    },
    {
      src: "images/stores/item0005.webp",
      title: "SPRING PASTEL SHORT SLEEVE TEE",
      price: "4500",
      href: "https://elparaiso.stores.jp/items/6062c865d5e9c96a810fbeb8",
      available: true
    },
    {
      src: "images/stores/item0004.webp",
      title: "SPRING WARM COLORED BANDANA",
      price: "1000",
      href: "https://elparaiso.stores.jp/items/6062d330d5e9c96aa70fc199",
      available: true
    },
    {
      src: "images/stores/item0003.webp",
      title: "SPRING COLD COLORED BANDANA",
      price: "1000",
      href: "https://elparaiso.stores.jp/items/6062d421a87fc501cb2b33d5",
      available: true
    },
    {
      src: "images/stores/item0002.webp",
      title: "SPRING WARM COLORED SOCKS",
      price: "1000",
      href: "https://elparaiso.stores.jp/items/6062d3c7d5e9c96a330fc184",
      available: true
    },
    {
      src: "images/stores/item0001.webp",
      title: "SPRING COLD COLORED SOCKS",
      price: "1000",
      href: "https://elparaiso.stores.jp/items/6062d45bd5e9c96a330fc1c6",
      available: true
    }
  ]

  function changeYen(price){
      return Number(price).toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
  }

  return (
    <ul className={classes.list}>
      {ITEMS.map((item) => {
        const available = item.available
        const yen = changeYen(item.price)
        return (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={item.src}
                className={classes.item}
              />
            </a>
            <p>{item.title}</p>
            {available?
              <p>{yen}</p> : <p>SOLD OUT</p>
            }
          </li>
        )
      })}
    </ul>
  )
}
