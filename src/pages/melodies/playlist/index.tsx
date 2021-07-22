import Head from "next/head";
import { Footer } from "src/components/Footer";
import { Main } from "src/components/Main";
import { Header } from "src/components/Header";

export default function Playlist() {
  return (
    <>
      <Head>
        <title>playlist - EL PARAISO</title>
      </Head>
      <Header />
      <Main page="playlist" />
      <Footer />
    </>
  );
}
