import Link from "next/link";
import Image from "next/image";
import React from "react";
import logo from "public/images/logo.svg";

export const Headline = () => {
  return (
    <>
      <Link href="/" prefetch={false}>
        <div>
          <Image src={logo} alt="EL PARAISO logo" width={400} height={200} priority />
        </div>
      </Link>
    </>
  );
};
