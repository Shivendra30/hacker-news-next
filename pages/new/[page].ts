import StoryList from '../top/[page]';
import axios from 'axios';

export default StoryList;

export async function getServerSideProps(context) {
  const res = await axios.get<number[]>(
    'https://hacker-news.firebaseio.com/v0/newstories.json'
  );
  return {
    props: {
      storyIds: res.data,
      page: context.query.page ? parseInt(context.query.page) : 1,
      pageTitle: 'HN Next | New'
    }
  };
}
