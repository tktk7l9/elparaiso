import Image from "next/image";
import Link from "next/link";

type PlaylistProps = {
  src: string;
  title: string;
  /** When set, the cover links there; the detail view leaves it unset (no self-link). */
  href?: string;
};

export const Playlist = ({ href, src, title }: PlaylistProps) => {
  const cover = (
    <Image
      src={src}
      alt={title}
      width={300}
      height={300}
      sizes="300px"
      priority
      className="mx-auto"
    />
  );
  return (
    <>
      {href ? (
        <Link href={href} className="block">
          {cover}
        </Link>
      ) : (
        cover
      )}
      <p className={"p-2"}>{title}</p>
    </>
  );
};
