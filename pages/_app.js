import "../styles.css";
import NextNProgress from "../components/NextNProgress";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=5,maximum-scale=5"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link
          href="/icon-72x72.png"
          rel="icon"
          type="image/png"
          sizes="72x72"
        />
        <link
          href="/icon-96x96.png"
          rel="icon"
          type="image/png"
          sizes="96x96"
        />
        <link rel="apple-touch-icon" href="/icon-72x72.png"></link>
        <meta name="theme-color" content="#f26522" />
        <link
          key="bootstrap"
          rel="preload"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          as="style"
          onload="this.onload=null;this.rel='stylesheet'"
        />
        {/* <link
          key="bootstrap"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        /> */}

        {/* <script>console.log = function() {}</script> */}
      </Head>
      <NextNProgress />
      <Component {...pageProps} />
    </div>
  );
}
