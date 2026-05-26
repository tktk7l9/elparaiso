import Link from "next/link";
import Image from "next/image";
import logo from "public/images/logo.svg";

export const Headline = () => {
  return (
    <Link href="/">
      <div>
        <Image
          src={logo}
          alt="EL PARAISO logo"
          width={400}
          height={200}
          priority
          unoptimized
        />
      </div>
    </Link>
  );
};
