import Link from "next/link";
import Image from "next/image";
import React from "react";
import logo from "public/images/logo.svg";

export const Headline = () => {
  return (
    <>
      <Link href="/" passHref>
        <div>
          <Image src={logo} alt="logo" width={400} height={200} />
        </div>
      </Link>
    </>
  );
};
