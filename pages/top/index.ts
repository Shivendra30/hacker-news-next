import StoryList from './[page]';
import axios from 'axios';

export default StoryList;

export async function getServerSideProps(context) {
  const res = await axios.get<number[]>(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  );
  const storyIds: number[] = res.data;

  return {
    props: {
      storyIds,
      page: context.query.page ? parseInt(context.query.page) : 1,
      pageTitle: 'HN Next | Top'
    }
  };
}
