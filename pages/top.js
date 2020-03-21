import Header from "../components/Header";
import axios from "axios";
import getTimePassed from "../helpers/getTimePassed";
import { useState, useEffect } from "react";
import Head from "next/head";

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
        <div style={{ width: "80%", margin: "auto", backgroundColor: "white" }}>
          {topStories.map(renderStory)}
        </div>
      </div>
    </>
  );
};

const renderStory = story => {
  const { score, title, by, time, kids, id } = story;
  return (
    <div key={id} className="storyContainer">
      <p className="storyScore">{score}</p>
      <div className="innerStoryContainer">
        {title}
        <div className="storyDetailsContainer">
          <p style={{ opacity: 0.75, margin: "0px" }}>
            by {by} {getTimePassed(time)} | {kids && `${kids.length} comments`}
          </p>
        </div>
      </div>
      {styles()}
    </div>
  );
};

const styles = () => (
  <style jsx global>
    {`
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

      .storyDetailsContainer {
        display: flex;
        flex-direction: row;
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
