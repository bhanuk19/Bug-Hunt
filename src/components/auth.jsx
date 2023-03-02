import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogins,setAdmin } from "../reducers/globalStates";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Auth() {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const cookie = new Cookies();

  useEffect(() => {
    if (cookie.get("session_id")) {
      axios
        .post(
          "/auth",
          { session_id: cookie.get("session_id") },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          if (res.data) {
            dispatcher(
              setLogins([res.data, sessionStorage.getItem("username")])
            );
            navigate(-2)
          }
        });
      return;
    } else {
      let params = new URLSearchParams(window.location.search);
      let session = {};
      for (let p of params) {
        session[p[0]] = p[1];
        if(p[0]==="role"){
          dispatcher(setAdmin(p[1]==="true"));
        }
        cookie.set(p[0], p[1], { path: "/" });
      }
      if (session["session_id"]) {
        dispatcher(setLogins([true, cookie.get("username")]));
        navigate("/bug-hunter");
      } else {
        dispatcher(setLogins([false, null]));
        window.location.href = "http://localhost:3050/?app=bug-hunter";
      }
    }
  });
  return <></>;
}
