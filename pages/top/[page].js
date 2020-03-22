import Header from "../../components/Header";
import axios from "axios";
import getTimePassed from "../../helpers/getTimePassed";
import getDomain from "../../helpers/getDomain";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const StoryList = ({ storyIds, page }) => {
  const LIMIT = 15; // no of stories in one page
  const PAGES = parseInt(storyIds.length / LIMIT) + 1; // no of pages
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
      let promises = storyIds.slice(from, to).map(id => {
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
      <div className="mainView">
        <Header />

        <div className="pageControls">
          {page > 1 ? (
            <Link href="/top/[page]" as={`/top/${page - 1}`}>
              <a className="orange no-underline">{`< prev`}</a>
            </Link>
          ) : (
            <label className="disabled no-underline"> {`< prev`}</label>
          )}
          <p>
            {page}/{PAGES}
          </p>
          <Link href="/top/[page]" as={`/top/${page + 1}`}>
            <a className="orange no-underline"> {`next >`} </a>
          </Link>
        </div>
        <div className="news-list">
          <ul
            style={{
              // width: "80%",
              // margin: "8rem auto 0 auto",
              backgroundColor: "white",
              // minHeight: "100vh",
              textAlign: loading ? "center" : "left",
              listStyle: "none"
            }}
          >
            {loading && (
              <>
                <div
                  className="spinner-border mt-3"
                  role="status"
                  style={{ color: "#f26522" }}
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </>
            )}
            {!loading &&
              topStories.map(story => (
                <Story key={story.id} story={story} loading={loading} />
              ))}
          </ul>
        </div>
        {styles()}
      </div>
    </>
  );
};

const Story = ({ story, loading }) => {
  const { score, title, by, time, kids, id } = story;
  let url = story.url ? getDomain(story.url) : "";
  return (
    <li key={id} className="storyContainer">
      <span className="storyScore">{score}</span>
      <span className="title">
        <a
          className="undecorated"
          href={story.url}
          target="_blank"
          rel="noopener"
        >
          {title} &nbsp;
        </a>
        <span className="host">({url})</span>
      </span>
      <br />
      <span className="meta">
        <span className="by">
          by{" "}
          <Link href="/user/[id]" as={`/user/${by}`}>
            <a className="orange">{by}</a>
          </Link>
        </span>
        <span className="time">{` ${getTimePassed(time)}`}</span>
        <span className="comments-link">
          |{" "}
          <Link href="/item/[id]" as={`/item/${id}`}>
            <a className="orange">{kids && `${kids.length} comments`}</a>
          </Link>
        </span>
      </span>
    </li>
  );
};

const styles = () => (
  <style jsx>
    {`
      body {
        background: #f2f3f5;
      }

      .mainView {
        max-width: 800px;
        margin: 0 auto;
        position: relative;
      }

      .news-list {
        position: absolute;
        margin: 30px 0;
        top: 100px;
        width: 100%;
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        background-color: #fff;
        body: 2px;
      }

      .pageControls {
        display: flex;
        flex-direction: row;
        position: fixed;
        z-index: 998;
        top: 55px;
        background: white;
        width: 100%;
        justify-content: center;
        padding: 1rem 0rem;

        left: 0;
        right: 0;
        z-index: 998;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
        color: #f26522;
      }

      a.undecorated {
        text-decoration: none;
        color: #000;
      }

      a.undecorated:hover {
        color: #000;
      }

      .storyContainer {
        background-color: #fff;
        padding: 20px 30px 20px 80px;
        border-bottom: 1px solid #eee;
        position: relative;
        line-height: 20px;
      }

      .storyScore {
        color: #f26522;
        font-size: 1.1em;
        font-weight: 700;
        position: absolute;
        top: 50%;
        left: 0;
        width: 80px;
        text-align: center;
        margin-top: -10px;
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

      .host,
      .meta {
        font-size: 0.85em;
        color: #828282;
      }

      .storyDetailsContainer {
        display: flex;
        flex-direction: row;
      }

      .storyDetailsContainer p {
        opacity: 0.75;
      }

      .disabled {
        opacity: 0.75;
        cursor: not-allowed;
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
      storyIds: res.data,
      page: context.query.page ? parseInt(context.query.page) : 1
    }
  };
}
export default StoryList;
