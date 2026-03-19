import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import {useEffect } from "react";
import UserList from "./page/User-list";
import ProductList from "./page/Product-list";
import CategoryList from "./page/Category-list";


const AppRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    
  }, []);

  
  return (
    <Routes>

      <Route element={<Dashboard />} path="/" />
     
      <Route path="/login" element={<Login />} />
      <Route path="/product-list" element={<ProductList />} />
      <Route path="/category-list" element={<CategoryList />} />
      <Route path="/user-list" element={<UserList />} />
    </Routes>
  );
};

export default AppRoutes;
