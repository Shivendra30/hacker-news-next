import { useRouter } from "next/router";
import Header from "../../components/Header";
import Head from "next/head";
import axios from "axios";
import { userState, useEffect, useState } from "react";
import getTimePassed from "../../helpers/getTimePassed";

const User = props => {
  const router = useRouter();
  const itemId = router.query.id;
  const [itemDetails, setItemDetails] = useState({});

  const getItemDetails = async () => {
    const res = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`
    );

    if (res.data && res.data.kids) {
      const { kids } = res.data;
      let promises = kids.map(commentId =>
        axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
        )
      );

      const result = await Promise.all(promises);
      console.log(result);

      setItemDetails(res.data);
    }
  };

  useEffect(() => {
    getItemDetails();
  }, [itemId]);

  return (
    <div className="mainContainer">
      <Header />

      {styles()}
    </div>
  );
};

const styles = () => <style jsx global>{``}</style>;
export default User;
