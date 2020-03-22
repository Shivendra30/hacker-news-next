import Header from "../../components/Header";
import axios from "axios";
import getTimePassed from "../../helpers/getTimePassed";
import getDomain from "../../helpers/getDomain";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const Top = ({ topStoryIds, page }) => {
  const LIMIT = 15; // no of stories in one page
  const PAGES = parseInt(topStoryIds.length / LIMIT) + 1; // no of pages
  const [topStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [page, setPage] = useState(3);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    setLoading(true);
    try {
      const from = (page - 1) * LIMIT + 1;
      const to = from + LIMIT;
      console.log({ LIMIT, PAGES, page, from, to });
      let promises = topStoryIds.slice(from, to).map(id => {
        return axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
      });
      const result = await Promise.all(promises);
      setTopStories(result.map(i => i.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Top Stories</title>
        <meta property="og:title" content="Top Stories" />
      </Head>
      <div style={{ backgroundColor: "#f2f3f5" }}>
        <Header />

        <div className="pageControls">
          {page > 1 && (
            <Link href="/top/[page]" as={`/top/${page - 1}`}>
              <a className="orange no-underline"> {`< prev`} </a>
            </Link>
          )}
          <p>
            {page}/{PAGES}
          </p>
          <Link href="/top/[page]" as={`/top/${page + 1}`}>
            <a className="orange no-underline"> {`next >`} </a>
          </Link>
        </div>
        {loading && <p style={{ color: "#000" }}>Loading...</p>}
        {!loading && (
          <ul
            style={{
              width: "80%",
              margin: "4rem auto",
              backgroundColor: "white"
            }}
          >
            {topStories.map(renderStory)}
          </ul>
        )}
        {styles()}
      </div>
    </>
  );
};

const renderStory = story => {
  const { score, title, by, time, kids, id } = story;
  let url = story.url ? getDomain(story.url) : "";

  return (
    <li key={id} className="storyContainer">
      <p className="storyScore">{score}</p>
      <a className="undecorated" href={story.url} target="_blank">
        <div className="innerStoryContainer">
          {title}

          <div className="storyDetailsContainer">
            <p>
              {`by `}
              <Link href="/user/[id]" as={`/user/${by}`}>
                <a className="orange">{by}</a>
              </Link>
              {` ${getTimePassed(time)}`} | &nbsp;
              <Link href="/item/[id]" as={`/item/${id}`}>
                <a className="orange">{kids && `${kids.length} comments`}</a>
              </Link>
              &nbsp;({url}){/* {kids && `${kids.length} comments `}({url}) */}
            </p>
          </div>
        </div>
      </a>
    </li>
  );
};

const styles = () => (
  <style jsx>
    {`
      .pageControls {
        display: flex;
        flex-direction: row;
        position: fixed;
        top: 55px;
        background: white;
        width: 100%;
        justify-content: center;
        padding: 1rem 0rem;
      }

      .pageControls p {
        margin: 0rem 1rem;
      }

      .no-underline {
        text-decoration: none !important;
      }

      a.orange {
        text-decoration: underline;
        color: #000;
        opacity: 0.75;
      }

      a.orange:hover {
        color: #f60;
      }

      a.undecorated {
        text-decoration: none;
        color: #000;
      }

      a.undecorated:hover {
        color: #000;
      }

      .storyContainer {
        display: grid;
        grid-template-columns: 1fr 6fr;
        border-bottom: 1px solid #f2f3f5;
        padding: 0.75em;
      }

      .storyScore {
        color: #f60;
        font-weight: bold;
        font-size: 1.5em;
        align-self: center;
        margin: 1rem;
      }

      .innerStoryContainer {
        dispaly: flex;
        flex-direction: column;
        margin: 1rem;
        justifycontent: center;
      }

      .title {
        display: flex;
        flex-direction: row;
      }

      .storyDetailsContainer {
        display: flex;
        flex-direction: row;
      }

      .storyDetailsContainer p {
        opacity: 0.75;
      }
    `}
  </style>
);

export async function getServerSideProps(context) {
  const res = await axios.get(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  return {
    props: {
      topStoryIds: res.data,
      page: context.query.page ? parseInt(context.query.page) : 1
    }
  };
}
export default Top;
