import "../styles.css";
import NextNProgress from "../components/NextNProgress";

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <NextNProgress />
      <Component {...pageProps} />
    </div>
  );
}
