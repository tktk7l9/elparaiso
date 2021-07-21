import Link from "next/link";
import Image from "next/image";
import about from "public/images/top/about.webp";
import melodies from "public/images/top/melodies.webp";
import projects from "public/images/top/projects.webp";
import store from "public/images/top/store.webp";
import library from "public/images/top/library.webp";

export const Cards = () => {
  return (
    <div className={"text-center"}>
      <Link href="/about">
        <Image
          src={about}
          alt="about"
          placeholder="blur"
          width={300}
          height={300}
        />
      </Link>
      <Link href="/melodies">
        <Image
          src={melodies}
          alt="melodies"
          placeholder="blur"
          width={300}
          height={300}
        />
      </Link>
      <Link href="/projects">
        <Image
          src={projects}
          alt="projects"
          placeholder="blur"
          width={300}
          height={300}
        />
      </Link>
      <a
        href="https://elparaiso.stores.jp/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={store}
          alt="store"
          placeholder="blur"
          width={300}
          height={300}
        />
      </a>
      <Link href="/library">
        <Image
          src={library}
          alt="library"
          placeholder="blur"
          width={300}
          height={300}
        />
      </Link>
    </div>
  );
};
