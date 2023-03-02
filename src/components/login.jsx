import axios from "axios";
import React, { useEffect } from "react";
// import userSession from "../store";
import { useNavigate } from "react-router-dom";
import Auth from "./auth";
import Cookies from "universal-cookie";
import { checkAuth } from "../functions/auth";


export default function Login() {
  const navigate = useNavigate()
  useEffect(()=>{
    const cookie = new Cookies();
    if (cookie.get("session_id")!==undefined) {
      navigate("/bug-hunter/authenticate")
    }
  },[])
  return <Auth />;
}
