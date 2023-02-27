import React from "react";
import axios from "axios";
import * as R from "ramda";
import "../Styles/style.css";
const FixModal = ({ setAction, action, setVisibility, visibility, id, bugs }) => {
  const bug = R.find(R.propEq("_id", id), bugs);
  const handleApproval = (e) => {
    let fixID = bug._id;
    window.confirm("Are you sure you want to Approve this Bug")
      ? axios
          .post(
            "/fixhandle",
            { id: fixID, bugID: bug.bugID ,updateStatus: "Fixed" },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then(() => {
            setAction(!action);
          })
          .catch((error) => {
            console.log(error);
          })
      : alert("Okay");
  };

  const handleReject = (e) => {
    let fixID = bug._id;
    window.confirm("Are you sure you want to reject")
      ? axios
          .post(
            "/fixhandle",
            { id: fixID, bugID: bug.bugID ,updateStatus: "Reject" },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then(() => {
            setAction(!action);
          })
          .catch((error) => {
            console.log(error);
          })
      : alert("Okay");
  };
  const handleHide = (e) => {
    setVisibility(!visibility);
  };
  return (
    <div className="more-details">
      <span className="close-button">
        <i className="fa-regular fa-circle-xmark" onClick={handleHide}></i>
      </span>
      <span>
        <b>FixID: </b>
        {bug._id}
      </span>
      <span>
        <b>BugID: </b>
        {bug.bugID}
        
      </span>
      <span>
        <b>Description: </b>
        <br />
        {bug.fixDescription}
      </span>
      <span>
        <b>Fix URL: </b>
        <a href={bug.fixURL} target="_blank" rel="noreferrer">
          {bug.fixURL}
        </a>
      </span>
      <span>
        {bug.comments ? (
          bug.comments === "None" ? (
            ""
          ) : (
            <>
              <b>Comments:<br /></b>
              {bug.comments}
            </>
          )
        ) : (
          ""
        )}
      </span>
      <span>
        <b>Reported on: </b>
        {bug.createdAt.substr(0, 10) + " @ " + bug.createdAt.substr(11, 8)}
      </span>
      <span>
        <b>Last Updated on: </b>
        {bug.updatedAt.substr(0, 10) + " @ " + bug.updatedAt.substr(11, 8)}
      </span>
      <div>
        <button onClick={handleApproval} style={{ background: "#218838" }}>
          Approve
        </button>
        <button onClick={handleReject} style={{ background: "#DC3545" }}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default FixModal;
