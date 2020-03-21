import { useRouter } from "next/router";
import Header from "../../components/Header";
import Head from "next/head";
import axios from "axios";
import { userState, useEffect, useState } from "react";
import getTimePassed from "../../helpers/getTimePassed";
import Link from "next/link";

const User = props => {
  const router = useRouter();
  const userId = router.query.id;
  const [userDetails, setUserDetails] = useState({});

  const getUserDetails = async () => {
    console.log(router.query);
    const res = await axios.get(
      `https://hacker-news.firebaseio.com/v0/user/${userId}.json`
    );
    console.log(res.data);
    setUserDetails(res.data);
  };

  useEffect(() => {
    if (userId) getUserDetails();
  }, [userId]);

  const { about, created, id, karma, submitted } = userDetails;
  return (
    <div className="mainContainer">
      <Header />
      <div className="userContainer">
        <h3>User: {id}</h3>
        <p>Created: {getTimePassed(created)}</p>
        <p>Karma: {karma}</p>
        <Link href={`https://news.ycombinator.com/submitted?id=${userId}`}>
          <a target="_blank">Submissions</a>
        </Link>
      </div>
      {styles()}
    </div>
  );
};

const styles = () => (
  <style jsx global>{`
    a {
      text-decoration: underline;
      color: #000;
      opacity: 0.75;
    }

    a:hover {
      color: #f60;
    }

    .mainContainer {
      background: #f2f3f4;
      height: 100vh;
    }

    .userContainer {
      background: white;
      margin: auto;
      max-width: 50%;
      padding: 2em;
    }
  `}</style>
);
export default User;
