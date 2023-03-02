/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FixModal } from "./modals";
import { useNavigate } from "react-router-dom";
import { sortDateAscend, sortDateDesc } from "../functions/filters";
import axios from "axios";
export default function Fixes() {
  const navigate = useNavigate();
  const tableHead = ["FixID", "Description", "Status", "Date", "Action"];
  const [fixes, setFixed] = useState(false);
  const [action, setAction] = useState(false);
  const [fixID, setID] = useState(null);
  const [modalVisibility, setVisibility] = useState(false);
  const getFixes = () => {
    setVisibility(null);
    axios
      .post(
        "/fixes",
        { admin: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data?.auth === false) {
          alert("Unauthorized");
          navigate("/dashboard");
        } else {
          setFixed(response.data);
        }
      });
  };
  const handleAction = (e) => {
    setID(e.target.parentNode.parentNode.id);
    setVisibility(true);
  };

  const [ascend, setAscend] = useState(false);
  const sortFunction = () => {
    ascend ? setFixed(sortDateDesc(fixes)) : setFixed(sortDateAscend(fixes));
    setAscend(!ascend);
  };

  useEffect(getFixes, [action]);
  return fixes ? (
    <>
      <div className="form-div">
        <h2>Fixes</h2>
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
            {fixes.map((fix, index) => {
              return (
                <tr key={fix._id} className="fix-bug-list-element" id={fix._id}>
                  <td>{fix._id}</td>
                  <td>{fix.fixDescription.substr(0, 15) + "...."}</td>
                  <td>{fix.status}</td>
                  <td>{fix.createdAt.substr(0, 10)}</td>
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
        {fixID == null ? (
          <></>
        ) : (
          <FixModal
            visibility={modalVisibility}
            setVisibility={setVisibility}
            setAction={setAction}
            id={fixID}
            bugs={fixes}
            action={action}
          />
        )}
      </div>
    </>
  ) : (
    <h1>Loading......</h1>
  );
}
