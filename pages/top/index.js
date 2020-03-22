import Top from "./[page]";
import axios from "axios";

export default Top;

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
