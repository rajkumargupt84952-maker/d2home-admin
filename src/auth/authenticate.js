import {  Route } from "react-router-dom";
import Login from "../pages/login";

export const authenticate = (url, components) => {
  
        return <Route element={components} path={url} />;
      
  
};
