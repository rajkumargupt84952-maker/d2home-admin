import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import logo from "../assets/img/logo/logo-main.png";
import { api, baseUrl } from "../url";
import axios from "axios";
import { UserLoginContext } from "../loginData/UserLoginProvider";
import { errorToast, successToast } from "./logics/utils";
import { toast } from "react-toastify";
import { OrderContext } from "../loginData/RealTimeOrderProvider";
import { connectFromSocket } from "./sockets/socket";

const Login = () => {
  const navigate = useNavigate();
  const { setUserLoginData } = useContext(UserLoginContext);
  const { setWaiterNotification, setOrderNotifier } = useContext(OrderContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   navigate("/");
    // }
  }, []);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    if (name === "email" && value.length < 100) {
      setEmail(value);
    }
    if (name === "password" && value.length < 20) {
      setPassword(value);
    }
  };
const loginSubmit = ()=>{
navigate("/");
}
 
  return (
    <>
      <style>
        {`
        body {
        min-height: 100vh;
        display: grid;
        place-items: center;
        background-color: #e2e8f0;
        }
        p {
        font-size: 14px;
        color: #6b7280;
        }
        .signup-form {
        width: 480px;
        padding: 32px;
        border-radius: 8px;
        background-color: #ffffff;
        box-shadow: 2px 4px 8px #6b728040;
        text-align: center;
        }
        .header {
        margin-bottom: 48px;
        }
        .header h1 {
        font-weight: bolder;
        font-size: 28px;
        color: #6366f1;
        }
        .input {
        position: relative;
        margin-bottom: 24px;
        }
        .input input {
        width: 100%;
        border: none;
        padding: 8px 40px;
        border-radius: 4px;
        background-color: #f3f4f6;
        color: #1f2937;
        font-size: 16px;
        }
        .input input::placeholder {
        color: #6b7280;
        }
        .input i {
        top: 50%;
        width: 36px;
        position: absolute;
        transform: translateY(-50%);
        color: #6b7280;
        font-size: 16px;
        }
        .signup-btn {
        width: 100%;
        display: block;
        color: #fff;
        border-radius: 4px ;
        font-weight: 600;
        }
        .signup-btn:active {
        background-color: #4f46e5;
        transition: all 0.3s ease;
        }
        a {
        color: #6366f1;
        text-decoration: none;
        }
        .logo {
        width: 100%;
        }
  `}
      </style>
      <div className="signup-form">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Link
                to="/"
                className="logo d-flex align-items-center text-decoration-none justify-content-center mb-5"
              >
                <div className="logo-pt">
                  <img src={logo} alt="" />
                </div>
              </Link>
            </div>
          </div>
          <form onSubmit={loginSubmit}>
            {/* <div className="input">
              <i>
                <FaUser />
              </i>
              <input type="text" placeholder="Username" />
            </div> */}
            <div className="input">
              <i>
                <FaEnvelope />
              </i>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                onChange={changeHandler}
                value={email}
              />
            </div>
            <div className="input">
              <i>
                <FaLock />
              </i>
              <input
                type="password"
                placeholder="Password"
                onChange={changeHandler}
                name="password"
                value={password}
              />
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="signup-btn bg-gradient-primary py-2"
              >
                LOG IN
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
