import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

import Head from "next/head";
import { GA_TRACKING_ID, pageview } from "../libs/gtag";
import { useRouter } from "next/router";
import { useEffect } from "react";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    const handleRouteChange = (url) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="2021年より発足したコミュニティブランド。染め・プリント・グラフィックデザインで日々の感情や情景をプロダクトに反映。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elparaiso.vercel.app" />
        <meta property="og:site_name" content="EL PARAISO" />
        <meta property="og:title" content="EL PARAISO" />
        <meta property="og:description" content="2021年より発足したコミュニティブランド。染め・プリント・グラフィックデザインで日々の感情や情景をプロダクトに反映。" />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EL PARAISO" />
        <meta name="twitter:description" content="2021年より発足したコミュニティブランド。染め・プリント・グラフィックデザインで日々の感情や情景をプロダクトに反映。" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
