import Head from "next/head";
import classes from "src/styles/Home.module.css";
import { Footer } from "src/components/Footer";
import { Main } from "src/components/Main";
import { Header } from "src/components/Header";
import React from "react";

export default function Home() {
  return (
    <div className={classes.container}>
      <Head>
        <title>EL PARAISO</title>
      </Head>
      <Header />
      <Main page="index" />
      <Footer />
    </div>
  );
}
