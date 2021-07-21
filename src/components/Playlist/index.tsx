import Image from "next/image";
import Link from "next/link";

export const Playlist = (props) => {
  const { href, src, title } = props;
  return (
    <>
      <Link href={href}>
        <Image
          src={src}
          alt={title}
          width={300}
          height={300}
          placeholder="blur"
        />
      </Link>
      <p className={"p-4"}>{title}</p>
    </>
  );
};
