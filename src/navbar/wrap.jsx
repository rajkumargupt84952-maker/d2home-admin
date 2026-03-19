import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";

function Wrap(props) {
  const { Component } = props;

  return (
    <>
      <Header />
      <Sidebar />
      <Component />
      <Footer />
    </>
  );
}

export default Wrap;
