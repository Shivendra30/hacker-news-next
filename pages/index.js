import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/top");
  }, []);

  return <div>I am Index</div>;
};

export default Index;
