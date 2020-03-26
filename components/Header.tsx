import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

interface ActiveLinkProps {
  href: string;
  children: JSX.Element;
}

const ActiveLink = ({ href, children }: ActiveLinkProps): JSX.Element => {
  const router = useRouter();

  let className = children.props.className || '';
  if (router.pathname === href) {
    className = `${className} selected`;
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
};

const Header = (props): JSX.Element => {
  return (
    <div>
      <div className="header">
        <nav className="inner">
          <Link href="/top">
            <img
              alt="Hacker News"
              src="https://d1l6icgp8w0hse.cloudfront.net/assets/ycdc/ycombinator-logo-7481412385fe6d0f7d4a3339d90fe12309432ca41983e8d350b232301d5d8684.png"
            />
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

    @media only screen and (max-width: 500px) {
      /* For mobile phones: */
      .header img {
        max-height: 8%;
        max-width: 8%;
      }
    }
  `}</style>
);

export default Header;
