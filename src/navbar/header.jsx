import React, { useContext, useEffect, useState } from "react";

import { FaBars } from "react-icons/fa";
import profileimg from "../assets/img/businessman.png";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
// import Profile_Dropdown from "../components/profile-dropdown";
// import Notifications from "../components/notifications";
// import logo from "../assets/img/logo/logo-main.png";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [loggedData, setLoggetData] = useState(null);

  useEffect(() => {
    if (toggle) {
      document.body.classList.add("toggle-sidebar");
    } else {
      document.body.classList.remove("toggle-sidebar");
    }
    // console.log("toggled from useeffect ", toggle);
    let data = JSON.parse(localStorage.getItem("user"));
    setLoggetData(data);
  }, [toggle]);

  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link
            to="/"
            className="logo d-flex align-items-center text-decoration-none"
          >
            <div className="logo-pt">
              LOGO
            </div>
            {/* <span className="d-none d-lg-block">WMS</span> */}
          </Link>
          <FaBars
            className="toggle-sidebar-btn fs-2"
            onClick={() => setToggle(!toggle)}
          />

          <span className="m-2">
            {loggedData?.role === "MANAGER" && (
              <div>
                Restaurant :{" "}
                <span
                  className="fw-bold"
                  style={{
                    backgroundColor: "#7b2ad9",
                    padding: "5px",
                    color: "white",
                    borderRadius: "16px",
                  }}
                >
                  {loggedData?.restaurant[0]?.name}
                </span>
              </div>
            )}
          </span>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center justify-content-end">
            <li className="nav-item d-block d-lg-none">
              <Link className="nav-link nav-icon search-bar-toggle " to="#">
                <i className="bi bi-search"></i>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Dropdown>
                {/* <Dropdown.Toggle className="nav-link nav-icon bg-white border-0" id="dropdown-basic1">
           <FaBell className="2x" />
                <span className="badge bg-primary badge-number text-white">4</span>
        </Dropdown.Toggle> */}

                {/* ======Notifications ======= */}
                {/* <Notifications /> */}

                {/* ======Notifications end======= */}
              </Dropdown>
            </li>
            <li className="nav-item dropdown pe-3">
              <Dropdown>
                <Dropdown.Toggle
                  className="nav-link nav-profile d-flex align-items-center pe-0"
                  id="dropdown-basic"
                >
                  <img
                    src={profileimg}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <span className="d-none d-md-block  ps-2">
                    {loggedData?.name}
                  </span>
                </Dropdown.Toggle>
                {/* ======Profile Dropdown ======= */}
                {/* <Profile_Dropdown /> */}

                {/* ======Profile Dropdown end======= */}
              </Dropdown>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
