import Header from '../../components/Header';
import axios, { AxiosResponse } from 'axios';
import getTimePassed from '../../helpers/getTimePassed';
import getDomain from '../../helpers/getDomain';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import './pageStyles.css';
import { NextPage } from 'next';

interface StoryListProps {
  storyIds: number[];
  page: number;
  pageTitle: string;
}

export interface HNStory {
  by: string;
  descendants: number;
  id: number;
  kids: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

const StoryList: NextPage<StoryListProps> = ({ storyIds, page, pageTitle }) => {
  const LIMIT = 15;
  const PAGES = Math.floor(storyIds.length / LIMIT) + 1;
  const [topStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [page, storyIds]);

  const getData = async () => {
    setLoading(true);
    try {
      const from = (page - 1) * LIMIT + 1;
      const to = from + LIMIT;

      const promises = storyIds
        .slice(from, to)
        .map(id =>
          axios.get<HNStory[]>(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          )
        );
      const result = await Promise.all<AxiosResponse>(promises);

      setTopStories(
        result
          .map(i => i.data)
          .sort((a: HNStory, b: HNStory) => b.time - a.time)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
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
        <main className="news-list">
          <ul
            style={{
              textAlign: loading ? 'center' : 'left'
            }}
          >
            {loading && (
              <>
                <div
                  className="spinner-border mt-3"
                  role="status"
                  style={{ color: '#f26522' }}
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </>
            )}
            {!loading &&
              topStories.map(story => <Story key={story.id} story={story} />)}
          </ul>
        </main>
        {/* {styles()} */}
      </div>
    </>
  );
};

const Story = ({ story }) => {
  const { score, title, by, time, descendants, id } = story;
  let url = story.url ? getDomain(story.url) : null;

  return (
    <li key={id} className="storyContainer">
      <span className="storyScore">{score}</span>
      <span className="title">
        {url ? (
          <a
            className="undecorated"
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title} &nbsp;
          </a>
        ) : (
          <Link href="/item/[id]" as={`/item/${id}`} passHref>
            <a className="undecorated">{title} &nbsp;</a>
          </Link>
        )}
        <span className="host">{url}</span>
      </span>
      <br />
      <span className="meta">
        <span className="by">
          by{' '}
          <Link href="/user/[id]" as={`/user/${by}`}>
            <a className="orange" aria-label={by}>
              {by}
            </a>
          </Link>
        </span>
        <span className="time">{` ${getTimePassed(time)}`}</span>
        <span className="comments-link">
          {descendants > 0 && ' | '}
          <Link href="/item/[id]" as={`/item/${id}`}>
            <a className="orange" aria-label={by}>
              {descendants > 0 && descendants === 1 && `${descendants} comment`}
              {descendants > 0 && descendants > 1 && `${descendants} comments`}
            </a>
          </Link>
        </span>
      </span>
    </li>
  );
};

export async function getServerSideProps(context) {
  const page = context.query.page ? parseInt(context.query.page) : 1;
  const res = await axios.get<number[]>(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  );
  const storyIds = res.data;

  return {
    props: {
      storyIds,
      page,
      pageTitle: 'HN Next | Top'
    }
  };
}

export default StoryList;
