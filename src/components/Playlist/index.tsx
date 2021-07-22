import Image from "next/image";
import Link from "next/link";

export const Playlist = (props) => {
  const { href, src, title } = props;
  return (
    <>
      <Link href={href} passHref>
        <div>
          <Image
            src={src}
            alt={title}
            width={300}
            height={300}
            placeholder="blur"
          />
        </div>
      </Link>
      <p className={"p-2"}>{title}</p>
    </>
  );
};
