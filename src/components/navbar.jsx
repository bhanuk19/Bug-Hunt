import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelected, setLogins, setAdmin } from "../reducers/globalStates";
import { useNavigate } from "react-router-dom";
import { logout } from "../functions/auth";
import Cookies from "universal-cookie";
export default function Navbar(props) {
  const cookie = new Cookies()
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const destroySession = async () => {
    let flag = await logout();
    if (flag === true) {
      dispatcher(setLogins(false, null), setAdmin(false));
      navigate("/bug-hunter/authenticate");
    } else {
      return false;
    }
  };
  const State = useSelector((state) => state.globalStates);
  
  return (
    <nav className="nav-bar">
      {State.loggedIn ? (
        <>
          <div>
            <Link to="dashboard" className="home-link">
              Dashboard
            </Link>
          </div>
          <div>
            {State.admin ? (
              <div>
                <Link to="fixes">Fixes</Link>
                <Link to="reported">Reported Bugs</Link>
              </div>
            ) : (
              <></>
            )}
            <Link to="report">Report Bug</Link>
            <Link onClick={destroySession}>Logout</Link>
          </div>
        </>
      ) : (
        <div className="login-signup">
          <Link to="login">Login</Link>
          <Link to="signup">SignUp</Link>
        </div>
      )}
    </nav>
  );
}
