import Header from "../components/Header";
import axios from "axios";
import getTimePassed from "../helpers/getTimePassed";
import getDomain from "../helpers/getDomain";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const Top = props => {
  const [topStories, setTopStories] = useState(props.topStories);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
      let promises = res.data.slice(0, 10).map(id => {
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
        <h2 style={{ textAlign: "center" }}> Top Stories</h2>
        {loading && <p>Loading...</p>}
        <ul style={{ width: "80%", margin: "auto", backgroundColor: "white" }}>
          {topStories.map(renderStory)}
        </ul>
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
              <Link href="/user/[id]" as={`user/${by}`}>
                <a className="orange">{by}</a>
              </Link>
              {` ${getTimePassed(time)}`} | &nbsp;
              <Link href="/item/[id]" as={`item/${id}`}>
                <a className="orange">{kids && `${kids.length} comments `}</a>
              </Link>
              ({url}){/* {kids && `${kids.length} comments `}({url}) */}
            </p>
          </div>
        </div>
      </a>
      {styles()}
    </li>
  );
};

const styles = () => (
  <style jsx>
    {`
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

export async function getStaticProps(ctx) {
  //Get the first page of stories here
  return {
    props: {
      topStories: []
    }
  };
}
export default Top;
