import { React, useState } from "react";
import Header from "./navbar/header";
import Footer from "./navbar/footer";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Loader from "./loader/loader";
import AppRoutes from "./routes";
import Sidebar from "./navbar/sidebar";

const Main = ({ loader }) => {
  const { pathname } = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <>
      <Loader loader={loader} />
      <Toaster />
      {pathname !== "/login" && (
        <>
          <Header />
          <Sidebar />
        </>
      )}
      <AppRoutes />
      {pathname !== "/login" && <Footer />}
    </>
  );
};

export default Main;
