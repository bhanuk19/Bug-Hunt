import React, { useState, useEffect } from "react";
import axios from "axios";
// import * as R from "ramda";
import Modal from "./modal";
import { useNavigate } from "react-router-dom";
import { replace } from "ramda";
export default function Admin() {
  const navigate = useNavigate();
  const tableHead = [
    "id",
    "Bug Name",
    "Description",
    "Priority",
    "Date",
    "Status",
    "Action",
  ];
  const [reportedBugs, setReported] = useState(false);
  const [action, setAction] = useState(false);
  const [bugID, setID] = useState(null);
  const [modalVisibility, setVisibility] = useState(false);
  const getBugs = () => {
    setVisibility(null);
    axios
      .post(
        "/reported",
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
          navigate("/dashboard", { replace: true });
        } else {
          setReported(response.data);
        }
      });
  };
  const handleAction = (e) => {
    setID(e.target.parentNode.parentNode.id);
    setVisibility(true);
  };
  //   const setModal = () =>{

  //   }
  //   setInterval(getBugs, 1000);
  useEffect(getBugs, [action]);
  useEffect(() => {}, [bugID, modalVisibility, reportedBugs]);

  return reportedBugs ? (
    <>
      <div className="form-div">
        <h2>Reported Bugs</h2>
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
                  <td>{reported.status}</td>
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
          <Modal
            visibility={modalVisibility}
            setVisibility={setVisibility}
            setAction={setAction}
            id={bugID}
            bugs={reportedBugs}
            action={action}
          />
        )}
      </div>
    </>
  ) : (
    <h1>Loading......</h1>
  );
}
