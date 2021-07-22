import Head from "next/head";
import { Footer } from "src/components/Footer";
import { Main } from "src/components/Main";
import { Header } from "src/components/Header";

export default function Melodies() {
  return (
    <>
      <Head>
        <title>melodies - EL PARAISO</title>
      </Head>
      <Header />
      <Main page="melodies" />
      <Footer />
    </>
  );
}
