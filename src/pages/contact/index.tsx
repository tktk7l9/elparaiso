import Head from "next/head";
import { Footer } from "src/components/Footer";
import { Main } from "src/components/Main";
import { Header } from "src/components/Header";

export default function Contact() {
  return (
    <>
      <Head>
        <title>contact - EL PARAISO</title>
      </Head>
      <Header />
      <Main page="contact" />
      <Footer />
    </>
  );
}
