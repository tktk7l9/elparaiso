import Head from "next/head";
import classes from "src/styles/Home.module.css";
import { Footer } from "src/components/Footer";
import { Main } from "src/components/Main";
import { Header } from "src/components/Header";

export default function Library() {
  return (
    <div className={classes.container}>
      <Head>
        <title>library - EL PARAISO</title>
      </Head>
      <Header />
      <Main page="library" />
      <Footer />
    </div>
  );
}
