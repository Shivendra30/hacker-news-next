import StoryList from "./[page]";
import axios from "axios";

export default StoryList;

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
