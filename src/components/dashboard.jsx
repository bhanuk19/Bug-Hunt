import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelected } from "../reducers/selectBug";
export default function Dashboard(props) {
  const navigate = useNavigate();
  const [reportedBugs, setReported] = useState(false);
  const dispatcher = useDispatch();
  const tableHead = [
    "id",
    "Bug Name",
    "Description",
    "Priority",
    "Date",
    "Fix",
  ];
  useEffect(() => {
    let mounted = true;
    axios.get("/bugs").then((response) => {
      if (mounted) {
        setReported(response.data);
      }
    });
    return () => (mounted = false);
  }, []);
  useEffect(() => {}, [reportedBugs]);
  const addFix = (e) => {
    const bugID = e.target.parentNode.parentNode.id;
    dispatcher(setSelected(bugID));
    navigate("/fix", { replace: true });
  };
  return (
    <div className="dash-div">
      {reportedBugs ? (
        <>
          <div className="form-div">
            <h2>Approved Bugs</h2>
            <table className="bug-list">
              <thead>
                <tr>
                  {tableHead.map((ele, index) => {
                    return <th key={index}>{ele}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {reportedBugs.map((reported, index) => {
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
                        <button onClick={addFix}>Add Fix</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
