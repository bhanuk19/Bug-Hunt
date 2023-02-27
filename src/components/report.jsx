import React from "react";
import axios from "axios";
export default function Report() {
  return (
    <div className="form-div">
      <h1>Report Bug</h1>
      <form className="report-form">
        <input
          type="text"
          name="bugName"
          placeholder="Bug Name"
          required
          autoFocus
        />
        <input type="url" name="bugURL" placeholder="Bug Link" required />
        <textarea
          name="bugDescription"
          placeholder="Please Describe"
          required
          cols="40"
          rows="5"
          minLength={40}
        ></textarea>
        <textarea name="Comments" placeholder="//Comments"></textarea>
        <label htmlFor="priority">Priority: </label>
        <select name="priority" id="priority">
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="Critical">Critical</option>
        </select>
      </form>
      <button onClick={handleReport} className="form-button">
        Report Bug
      </button>
    </div>
  );
}

const handleReport = () => {
  axios
    .post("/reportBug", new FormData(document.querySelector("form")), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        alert("Success");
        // document.querySelector("form").reset()
      } else {
        alert("Failure");
      }
    });
};
