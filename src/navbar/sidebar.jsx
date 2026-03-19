import React, { useEffect, useState } from "react";

import {
  FaHome,

} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";


const Sidebar = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState(null);
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setLoginData(data);
    }
  }, []);

 
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink
              to="/"
              activeClassName="nav-link"
              className="d-flex nav-link-c"
            >
              <span className="menu-icon">
                <FaHome />
              </span>
              <span className="menu-title">Dashboard</span>
            </NavLink>
          </li>
           <li className="nav-item">
            <NavLink
              to="/product-list"
              activeClassName="nav-link"
              className="d-flex nav-link-c"
            >
              <span className="menu-icon">
                <FaHome />
              </span>
              <span className="menu-title">Product list</span>
            </NavLink>
          </li>
          
           <li className="nav-item">
            <NavLink
              to="/category-list"
              activeClassName="nav-link"
              className="d-flex nav-link-c"
            >
              <span className="menu-icon">
                <FaHome />
              </span>
              <span className="menu-title">Category list</span>
            </NavLink>
          </li>
           <li className="nav-item">
            <NavLink
              to="/user-list"
              activeClassName="nav-link"
              className="d-flex nav-link-c"
            >
              <span className="menu-icon">
                <FaHome />
              </span>
              <span className="menu-title">User list</span>
            </NavLink>
          </li>

        
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
