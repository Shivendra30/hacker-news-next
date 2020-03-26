import { NextPage } from 'next';

const Index: NextPage = () => {
  return <div />;
};

Index.getInitialProps = ({ res }) => {
  if (res) {
    //Redirect to "Top" page
    res.writeHead(301, {
      Location: '/top'
    });
    res.end();
  }

  return {};
};

export default Index;
