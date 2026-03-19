import React, {  useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/style.css";
import "../src/assets/css/responsive.css";
import Main from "./main";
import { useLoader } from "./hooks/Loader";
import { useNavigate } from "react-router-dom";
import { Routing } from "./utils/routing";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const loader = useLoader();
  const navigate = useNavigate();
  Routing.navigate = navigate;

  useEffect(() => {
    let token = localStorage.getItem("token");

  }, []);

  return <Main loader={loader.loader} />;
};

export default App;
