import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [admin, setAdmin] = useState(true);
  return (
    <nav className="nav-bar">
      {admin ? (
        <>
          <div>
            <Link to="dashboard" className="home-link">
              Dashboard
            </Link>
          </div>
          <div>
            <Link to="fixes">Fixes</Link>
            <Link to="reported">Reported Bugs</Link>
            <Link to="report">Report Bug</Link>
          </div>
        </>
      ) : (
        <></>
      )}
      {/* <Link to="report">Report</Link>
      <div className="login-signup">
        <Link to="login">Login</Link>
        <Link to="signup">SignUp</Link>
      </div> */}
    </nav>
  );
}
