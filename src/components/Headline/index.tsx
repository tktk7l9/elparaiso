import Link from "next/link";
import Image from "next/image";
import classes from "src/components/Headline/Headline.module.css";
import React from "react";

export const Headline = () => {
  return (
    <div>
      <Link href="/">
        <Image
          className={classes.logo}
          src="/images/logo.svg"
          alt="logo"
          width={400}
          height={200}
        />
      </Link>
    </div>
  );
};
