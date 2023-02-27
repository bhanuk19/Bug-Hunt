import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelected } from "../reducers/selectBug";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Fix(props) {
  const navigate = useNavigate();
  const selectedBug = useSelector((state) => state.selectedBug.value);
  const handleFix = (e) => {
    let newFix = new FormData(document.querySelector("form"));
    newFix.bugID = selectedBug;
    axios
      .post("/addFix", newFix, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("Fix Submitted!");
        navigate("/dashboard", { replace: true });
      });
  };
  return (
    <div className="form-div">
      <h1>Fix Bug</h1>
      <form className="report-form">
        <span>
          <b>BugID: </b>
          {selectedBug}
        </span>
        <input type="text" name="bugID" defaultValue={selectedBug} hidden />
        <input type="url" name="fixURL" placeholder="Fix Link" required />
        <textarea
          name="fixDescription"
          placeholder="Please Describe"
          required
          cols="40"
          rows="5"
          minLength={40}
        ></textarea>
      </form>
      <button className="form-button" onClick={handleFix}>
        Submit Fix
      </button>
    </div>
  );
}
