import React, { useEffect } from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";

export default function Root(props) {
  const logged = useSelector((state) => state.globalStates.loggedIn);

  const cookie = new Cookies();
  const navigate = useNavigate();
  useEffect(() => {
    if (!logged) {
      navigate("/bug-hunter/dashboard");
    }
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
