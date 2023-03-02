import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApprovedModal } from "./modals";
import { sortDateAscend, sortDateDesc } from "../functions/filters";
import { checkAuth } from "../functions/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setLogins } from "../reducers/globalStates";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Dashboard(props) {
  //Local States
  const cookie = new Cookies();
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const [approvedBugs, setApproved] = useState(false);
  const [ascend, setAscend] = useState(false);
  const [action, setAction] = useState(false);
  const [bugID, setID] = useState(null);
  const [modalVisibility, setVisibility] = useState(false);
  const tableHead = [
    "id",
    "Bug Name",
    "Description",
    "Priority",
    "Date",
    "Action",
  ];
  const [logged, setLogged] = useState(
    useSelector((state) => state.globalStates.loggedIn)
  );
  useEffect(() => {
    if (!logged) {
      if (checkAuth()) {
        dispatcher(
          setLogins([true, cookie.get("username")]),
          setAdmin((cookie.get("role")==='true'))
        );

        navigate("/bug-hunter");
      } else {
        navigate("/bug-hunter/login");
      }
    }
  });
  useEffect(() => {
    let mounted = true;
    axios.get("/bugs").then((response) => {
      if (mounted) {
        setApproved(response.data);
      }
    });
    return () => (mounted = false);
  }, []);
  useEffect(() => {}, [approvedBugs]);

  //Show Modal function
  const handleAction = (e) => {
    setID(e.target.parentNode.parentNode.id);
    setVisibility(true);
  };
  //Sort table based on
  const sortFunction = () => {
    ascend
      ? setApproved(sortDateDesc(approvedBugs))
      : setApproved(sortDateAscend(approvedBugs));
    setAscend(!ascend);
  };
  return (
    <div className="dash-div">
      {approvedBugs ? (
        <>
          <div className="form-div">
            <h2>Approved Bugs</h2>
            <table className="bug-list">
              <thead>
                <tr>
                  {tableHead.map((ele, index) =>
                    ele !== "Date" ? (
                      <th key={index}>{ele}</th>
                    ) : (
                      <th
                        key={index}
                        id="datehead"
                        style={{ cursor: "pointer" }}
                        onClick={sortFunction}
                      >
                        {ele}
                        <span id="sorticon" style={{ marginLeft: "10px" }}>
                          <i className="fa-solid fa-sort"></i>
                        </span>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {approvedBugs.map((reported, index) => {
                  return (
                    <tr
                      key={reported._id}
                      className="reported-bug-list-element"
                      id={reported._id}
                    >
                      <td>{reported._id}</td>
                      <td>{reported.bugName}</td>
                      <td>{reported.bugDescription.substr(0, 15) + "...."}</td>
                      <td
                        style={
                          reported.priority === "Critical"
                            ? { background: "#EC0A00" }
                            : reported.priority === "Moderate"
                            ? { background: "#066CC3" }
                            : { background: "#08B256" }
                        }
                      >
                        {reported.priority ? reported.priority : "Low"}
                      </td>
                      <td>{reported.createdAt.substr(0, 10)}</td>

                      <td>
                        <button
                          onClick={handleAction}
                          style={{
                            color: "#fff",
                            background: "#007bff",
                            padding: "5px 10px",
                            borderRadius: "5px",
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={modalVisibility ? "overlay active" : "overlay"}>
            {bugID == null ? (
              <></>
            ) : (
              <ApprovedModal
                visibility={modalVisibility}
                setVisibility={setVisibility}
                setAction={setAction}
                id={bugID}
                bugs={approvedBugs}
                action={action}
              />
            )}
          </div>
          <div className="form-div lboard">
            <h2>Leaderboard</h2>
          </div>
        </>
      ) : (
        <h1>Loading......</h1>
      )}
    </div>
  );
}
