import StoryList from "../top/[page]";
import axios from "axios";

export default StoryList;

export async function getServerSideProps(context) {
  const res = await axios.get(
    "https://hacker-news.firebaseio.com/v0/newstories.json"
  );
  return {
    props: {
      storyIds: res.data,
      page: context.query.page ? parseInt(context.query.page) : 1
    }
  };
}

// import Header from "../../components/Header";
// import axios from "axios";
// import getTimePassed from "../../helpers/getTimePassed";

// const New = props => {
//   return (
//     <div style={{ backgroundColor: "#f2f3f5" }}>
//       <Header />
//       <div style={{ width: "80%", margin: "auto", backgroundColor: "white" }}>
//         {props.newStories.map(renderStory)}
//       </div>
//     </div>
//   );
// };

// const renderStory = story => {
//   const { score, title, by, time, kids, id } = story;
//   return (
//     <div key={id} className="storyContainer">
//       <p className="storyScore">{score}</p>
//       <div className="innerStoryContainer">
//         {title}
//         <div className="storyDetailsContainer">
//           <p style={{ opacity: 0.75, margin: "0px" }}>
//             by {by} {getTimePassed(time)} | {kids && `${kids.length} comments`}
//           </p>
//         </div>
//       </div>
//       {styles()}
//     </div>
//   );
// };

// const styles = () => (
//   <style jsx global>
//     {`
//       .storyContainer {
//         display: grid;
//         grid-template-columns: 1fr 6fr;
//         border-bottom: 1px solid #f2f3f5;
//         padding: 0.75em;
//       }

//       .storyScore {
//         color: #f26522;
//         font-weight: bold;
//         font-size: 1.5em;
//         align-self: center;
//         margin: 1rem;
//       }

//       .innerStoryContainer {
//         dispaly: flex;
//         flex-direction: column;
//         margin: 1rem;
//         justifycontent: center;
//       }

//       .storyDetailsContainer {
//         display: flex;
//         flex-direction: row;
//       }
//     `}
//   </style>
// );

// export default New;

// export async function getStaticProps() {
//   const res = await axios.get(
//     "https://hacker-news.firebaseio.com/v0/newstories.json"
//   );
//   let promises = res.data.map(id => {
//     return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
//   });
//   const result = await Promise.all(promises);

//   return {
//     props: {
//       newStories: result.map(i => i.data)
//     }
//   };
// }
