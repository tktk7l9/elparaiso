import Head from "next/head";
import classes from "src/styles/Home.module.css";
import { Footer } from "src/components/Footer";
import { Main } from "src/components/Main";
import { Header } from "src/components/Header";

export default function About() {
  return (
    <div className={classes.container}>
      <Head>
        <title>about - EL PARAISO</title>
      </Head>
      <Header />
      <Main page="about" />
      <Footer />
    </div>
  );
}
