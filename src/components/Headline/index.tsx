import Link from "next/link";
import Image from "next/image";
import logo from "public/images/logo.svg";

export const Headline = () => {
  return (
    <Link href="/" className="block">
      <Image
        src={logo}
        alt="EL PARAISO logo"
        width={400}
        height={200}
        priority
        unoptimized
        className="mx-auto"
      />
    </Link>
  );
};
