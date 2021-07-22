import Head from "next/head";
import { Footer } from "src/components/Footer";
import { Main } from "src/components/Main";
import { Header } from "src/components/Header";

export default function Store() {
  return (
    <>
      <Head>
        <title>store - EL PARAISO</title>
      </Head>
      <Header />
      <Main page="store" />
      <Footer />
    </>
  );
}
