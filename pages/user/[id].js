import { useRouter } from "next/router";
import Header from "../../components/Header";
import Head from "next/head";
import axios from "axios";
import getTimePassed from "../../helpers/getTimePassed";
import Link from "next/link";

const User = ({ userDetails, userId }) => {
  const { created, id, karma } = userDetails;
  return (
    <>
      <Head>
        <title>HN Next | {id}</title>
        <meta property="og:title" content={`HN Next | ${id}`} />
      </Head>
      <div className="mainContainer">
        <Header />
        <main className="userContainer">
          <h3>User: {id}</h3>
          <p>Created: {getTimePassed(created)}</p>
          <p>Karma: {karma}</p>
          <span>
            <Link href={`https://news.ycombinator.com/submitted?id=${userId}`}>
              <a target="_blank" rel="noopener noreferrer">
                Submissions
              </a>
            </Link>
            &nbsp;|&nbsp;
            <Link href={`https://news.ycombinator.com/threads?id=${userId}`}>
              <a target="_blank" rel="noopener noreferrer">
                Comments
              </a>
            </Link>
          </span>
        </main>
        {styles()}
      </div>
    </>
  );
};

const styles = () => (
  <style jsx global>{`
    body {
      background: #f2f3f5;
    }
    .mainContainer {
      max-width: 800px;
      margin: 3rem auto;
    }

    a {
      text-decoration: underline;
      color: #000;
      opacity: 0.75;
    }

    a:hover {
      color: #f26522;
    }

    .mainContainer {
      background: #f2f3f4;
      height: 100vh;
    }

    .userContainer {
      background: white;

      padding: 2em;
    }
  `}</style>
);

export async function getServerSideProps(context) {
  const userId = context.query.id;
  const res = await axios.get(
    `https://hacker-news.firebaseio.com/v0/user/${userId}.json`
  );
  return {
    props: {
      userDetails: res.data,
      userId
    }
  };
}

export default User;
