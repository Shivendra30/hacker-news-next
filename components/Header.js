import Head from "next/head";
import Link from "next/link";

const Header = props => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />

        <link rel="manifest" href="/manifest.json" />
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
        <meta name="theme-color" content="#f60" />
        <link
          key="bootstrap"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
      </Head>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="/top">
          <a className="navbar-brand">HN</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/top">
                <a className="nav-link">Top</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/new">
                <a className="nav-link">New</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/show">
                <a className="nav-link">Show</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/ask">
                <a className="nav-link">Ask</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/jobs">
                <a className="nav-link">Jobs</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
