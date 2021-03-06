import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Head from 'next/head';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import getTimePassed from '../../helpers/getTimePassed';
import getDomain from '../../helpers/getDomain';
import Link from 'next/link';
import asyncForEach from '../../helpers/asyncForEach';
import ReactHtmlParser from 'react-html-parser';
import { NextPage } from 'next';
import { HNStory } from '../top/[page]';

interface ItemProps {
  itemDetails: HNStory;
}

const Item: NextPage<ItemProps> = ({ itemDetails }) => {
  const router = useRouter();
  const itemId = parseInt(router.query.id as string);
  const [commentTree, setCommentTree] = useState(new Map());
  const [loading, setLoading] = useState(false);

  const getItemDetails = async () => {
    setLoading(true);
    try {
      let commentsMap = new Map();
      await getComments(itemDetails, commentsMap);
      setCommentTree(commentsMap);
    } catch (err) {
      console.log('Error in getItemDetails', err);
    } finally {
      setLoading(false);
    }
  };

  //Recursive function to get all comments
  const getComments = async (itemDetails, commentsMap) => {
    if (itemDetails) {
      if (!itemDetails.kids) return;
      let promises = itemDetails.kids.map(commentId =>
        axios.get<HNStory[]>(
          `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
        )
      );

      const result = await Promise.all<AxiosResponse>(promises);
      //Extract all comments of the given item
      const comments = result.map(i => i.data);
      commentsMap.set(itemDetails.id, comments);

      await asyncForEach(comments, async (comment, index) => {
        comment.children = new Map();
        // comment.reactElement = commentToJsx(comment);
        await getComments(comment, comment.children);
      });
    }
  };

  useEffect(() => {
    getItemDetails();
  }, [itemDetails]);

  const commentTreeArray =
    Array.from(commentTree)[0] && Array.from(commentTree)[0][1]
      ? Array.from(commentTree)[0][1]
      : [];
  return (
    <div className="mainContainer">
      <Head>
        <title>HN Next | {itemDetails.title}</title>
        <meta property="og:title" content={itemDetails.title} />
      </Head>
      <Header />
      <div className="itemDetailsContainer">
        <div className="d-flex flex-column">
          <h5>
            <a
              href={itemDetails.url}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              {itemDetails.title}
            </a>{' '}
            <small>{getDomain(itemDetails.url)}</small>
          </h5>
          <span>
            {itemDetails.score} points | by&nbsp;
            <Link href="/user/[id]" as={`/user/${itemDetails.by}`}>
              <a>{itemDetails.by}</a>
            </Link>
            &nbsp;{getTimePassed(itemDetails.time)}
          </span>
        </div>
      </div>

      <main className="mainCommentsContainer">
        <p>
          {!loading && calculateComments(commentTree)} Comments
          {loading && ' loading...'}
          {/* {loading && (
            <div className="spinner-grow text-hn" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )} */}
        </p>
        <hr />
        {commentTreeArray.map(comment => (
          <Comment key={comment.id} comment={comment} itemId={itemId} />
        ))}
      </main>

      {styles()}
    </div>
  );
};

let comments = 0;
const calculateComments = commentTree => {
  if (!commentTree) return 0;
  commentTree.forEach((val, key, map) => {
    val.forEach(i => {
      if (i.children.size === 0) comments++;
      else if (i.children) calculateComments(i.children);
    });
  });
  return comments;
};

// const collapseText = id => {
//   const el = document.getElementById(id);

//   if (!el) return "";
//   const { className } = el;
//   console.log("collapseText: element", { className, el, id });
//   if (
//     (className.includes("show") && className.includes("collapsing")) ||
//     (className.includes("show") && !className.includes("collapsing"))
//   )
//     return "[+] Show replies";
//   else if (
//     (!className.includes("show") && className.includes("collapsing")) ||
//     (!className.includes("show") && !className.includes("collapsing"))
//   )
//     return "[-] Hide Replies";
// };

interface Comment extends HNStory {
  children?: Map<number, HNStory[]>;
  parent?: number;
  text?: string;
}

interface CommentProps {
  comment: Comment;
  itemId?: number;
}

const Comment = ({ comment, itemId }: CommentProps) => {
  let arr =
    Array.from(comment.children)[0] && Array.from(comment.children)[0][1]
      ? Array.from(comment.children)[0][1]
      : [];

  const nestedComments = arr.map(comment => {
    return <Comment comment={comment} key={comment.id} />;
  });

  const { id, by, text, time, parent: parentId } = comment;
  let containerClassname =
    parentId === itemId
      ? 'commentContainer'
      : 'commentContainer commentChildren';
  return (
    <div key={id} className={`${containerClassname} `}>
      <Link href="/user/[id]" as={`/user/${by}`}>
        <a>
          {by} {id}
        </a>
      </Link>
      &nbsp;
      <small>({getTimePassed(time)})</small>
      <br />
      <span>{ReactHtmlParser(text)}</span>
      {arr.length > 0 && (
        <div
          className="d-flex flex-row mt-1 seperator"
          onClick={() => {
            // let newVal = value + 1;
            // console.log("newVal -->", newVal);
            // setValue(newVal);
          }}
        >
          <a
            data-toggle="collapse"
            href={`#comment-${id}`}
            role="button"
            aria-expanded="true"
            aria-controls={`comment-${id}`}
            className="toggleReply"
          >
            {/* <small>{collapseText(`comment-${id}`)}</small> */}
            [-]
          </a>
          <hr />
        </div>
      )}
      <div id={`comment-${id}`} className="collapse show">
        {nestedComments}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const itemId = context.query.id;
  const res = await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`
  );

  console.log('ITEM PROPS', res.data);

  return {
    props: {
      itemDetails: res.data
    }
  };
}

const styles = () => (
  <style jsx global>{`

    body{
      background-color: #f2f3f5;
    }

    .mainContainer{
      background-color: #fff;
      min-height: 100vh;
      max-width: 800px;
      margin: 3rem auto;
      position: relative;
    }

    .itemDetailsContainer{
      /*max-width: 80%;*/
      background-color: white;
      margin: auto;
      padding: 1em;
    }

    .mainCommentsContainer{
      /*max-width: 80%;*/
      background-color: white;
      margin: auto;
      padding: 1em;
    }

    .commentContainer {
      margin-top: 1em;
    }

    .commentContainer small {
      color: #636363;
    }

    .toggleReply{
      color: #636363 !important;
    }

    .commentContainer a, .itemDetailsContainer a {
      color: #000;
      text-decoration: underline;
    }

    .commentContainer a:hover, .itemDetailsContainer a:hover {
      color: #f26522 !important;
    }

    .commentContainer hr {
      border: 0;
      clear: both;
      display: block;
      width: 90%;
      background-color: #b7b7b7;
      height: 1px;
      margin-top: 0.75em;
    }

    .seperator {
      cursor: pointer;
      color: #b7b7b7;
      text-decoration: none !important:
    }

    .no-underline{
      text-decoration: none !important;
    }

    .commentChildren {
      margin-left: 1.5em !important;
    }

    .text-hn{
      color: #f26522;
    }
  `}</style>
);
export default Item;
