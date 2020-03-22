import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const ActiveLink = ({ href, children }) => {
  const router = useRouter();

  let className = children.props.className || "";
  if (router.pathname === href) {
    className = `${className} selected`;
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
};

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
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />

        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
          integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <div className="header">
        <nav className="inner">
          <Link href="/top">
            <img src="https://d1l6icgp8w0hse.cloudfront.net/assets/ycdc/ycombinator-logo-7481412385fe6d0f7d4a3339d90fe12309432ca41983e8d350b232301d5d8684.png" />
          </Link>
          <ActiveLink href="/top">
            <a>Top</a>
          </ActiveLink>

          <ActiveLink href="/new">
            <a>New</a>
          </ActiveLink>

          <ActiveLink href="/show">
            <a>Show</a>
          </ActiveLink>

          <ActiveLink href="/ask">
            <a>Ask</a>
          </ActiveLink>

          <ActiveLink href="/jobs">
            <a>Jobs</a>
          </ActiveLink>
        </nav>
      </div>

      {styles()}
    </div>
  );
};

const styles = () => (
  <style jsx global>{`
    .header {
      background-color: #f26522;
      position: fixed;
      z-index: 999;
      height: 55px;
      top: 0;
      left: 0;
      right: 0;
    }

    .inner {
      max-width: 800px;
      box-sizing: border-box;
      margin: 0 auto;
      padding: 15px 5px;
    }

    .header a,
    img {
      color: hsla(0, 0%, 100%, 0.8);
      line-height: 24px;
      transition: color 0.15s ease;
      display: inline-block;
      vertical-align: middle;
      font-weight: 300;
      letter-spacing: 0.075em;
      margin-right: 1.8em;
      text-decoration: none;
    }

    .header a:hover {
      color: white;
    }

    .header a.selected {
      color: white !important;
    }

    .header img {
      max-height: 4%;
      max-width: 4%;
    }
  `}</style>
);

const bootstrapHeader = () => (
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
);

export default Header;
