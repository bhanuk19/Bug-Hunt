import Cookies from "universal-cookie";

import axios from "axios";
let cookie = new Cookies();
export const checkAuth = () => {
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
        return res.data;
      });
  }
};
// dispatcher(setLogins([res.data, sessionStorage.getItem("username")]));
//           navigate("/bug-hunter");

export const logout = async () => {
  let flag = false;
  await axios
    .post(
      "/logout",
      { session_id: cookie.get("session_id") },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => response.data)
    .then((data) => {
        cookie.set("session_id","",{path:"/", expires:new Date()})
      flag = data;
    });
  return flag;
};
