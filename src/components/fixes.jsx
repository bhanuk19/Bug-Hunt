import React, { useEffect, useState } from "react";
import FixModal from "./fixmodal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Fixes() {
  const navigate = useNavigate();
  const tableHead = [
    "FixID",
    "BugID",
    "Description",
    "Date",
    "Action",
  ];
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
          navigate("/dashboard", { replace: true });
        } else {
          setFixed(response.data);
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
  useEffect(getFixes, [action]);
  return fixes ? (
    <>
      <div className="form-div">
        <h2>Fixes</h2>
        <table className="bug-list">
          <thead>
            <tr>
              {tableHead.map((ele, index) => {
                return <th key={index}>{ele}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {fixes.map((fix, index) => {
              return (
                <tr key={fix._id} className="fix-bug-list-element" id={fix._id}>
                  <td>{fix._id}</td>
                  <td>{fix.bugID}</td>
                  <td>{fix.fixDescription.substr(0, 15) + "...."}</td>

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
