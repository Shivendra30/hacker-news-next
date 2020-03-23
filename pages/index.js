import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/top");
  }, []);

  return <div />;
};

Index.getInitialProps = ({ res }) => {
  if (res) {
    //Redirect to top page
    res.writeHead(301, {
      Location: "/top"
    });
    res.end();
  }

  return {};
};

export default Index;
