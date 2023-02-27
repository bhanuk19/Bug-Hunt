import axios from "axios";
// import React, { useEffect } from "react";
import userSession from "../store";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  //   us
  //     const userID = localStorage.getItem("id");
  //     if (userID) {
  //       const foundUser = JSON.parse(userID);
  //       userSession.setID(foundUser);
  //     //   navigate("/dashboard", { replace: true });
  //     }
  //   },[]);
  const handleLogin = () => {
    axios
      .post ("/login", new FormData(document.querySelector("form")), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        if (!result.data) {
          document.getElementById("mess").innerHTML =
            "Invalid Username or Password";
        } else {
          // userSession.setID(result.data);
          // localStorage.setItem("id", result.data);
          navigate("/dashboard", { replace: true });
        }
      });
  };
  return (
    <div>
      <form>
        <input type="text" name="username" placeholder="Username" />
        <input
          type="password"
          name="password"
          id=""
          placeholder="**************"
        />
        <span id="mess" style={{ color: "red" }}></span>
      </form>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
