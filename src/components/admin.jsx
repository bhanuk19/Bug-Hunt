/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as R from "ramda";
import { sortDateAscend, sortDateDesc } from "../functions/filters";
import { Modal } from "./modals";
import { useNavigate } from "react-router-dom";
import { Table, Header } from "semantic-ui-react";
import Cookies from "universal-cookie";
export default function Admin() {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const tableHead = [
    "Bug Name",
    "Reporter",
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
  const [ascend, setAscend] = useState(false);
  const [filter, setFilter] = useState("reported");
  const [filtered, setFiltered] = useState(false);
  const getBugs = () => {
    setVisibility(null);
    axios
      .post(
        "/reported",
        { sid: cookie.get("session_id") },
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
  useEffect(() => {
    setFiltered(R.filter(R.propEq("status", filter), reportedBugs));
  }, [bugID, modalVisibility, reportedBugs, filter]);
  const sortFunction = () => {
    ascend
      ? setReported(sortDateDesc(reportedBugs))
      : setReported(sortDateAscend(reportedBugs));
    setAscend(!ascend);
  };
  const selectFilter = (e) => {
    setFilter(e.target.id);
    // setFiltered(R.filter(R.propEq("status", filter), reportedBugs));
  };
  return filtered ? (
    <>
      <div className="form-div">
        <div className="head-div">
          <Header size="huge">Reported Bugs</Header>
          <div>
            <h3>Filters: </h3>
            <label htmlFor="reported" className="filter-label">
              <input
                type="radio"
                name="filter"
                id="reported"
                defaultChecked
                onChange={selectFilter}
              />{" "}
              Reported
            </label>
            <label htmlFor="Approved" className="filter-label">
              <input
                type="radio"
                name="filter"
                id="Approved"
                onChange={selectFilter}
              />{" "}
              Approved
            </label>
            <label htmlFor="Rejected" className="filter-label">
              <input
                type="radio"
                name="filter"
                id="Rejected"
                onChange={selectFilter}
              />{" "}
              Rejected
            </label>
            <label htmlFor="Fixed" className="filter-label">
              <input
                type="radio"
                name="filter"
                id="Fixed"
                onChange={selectFilter}
              />{" "}
              Fixed
            </label>
          </div>
        </div>
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              {tableHead.map((ele, index) =>
                ele !== "Date" ? (
                  <Table.HeaderCell key={index}>{ele}</Table.HeaderCell>
                ) : (
                  <Table.HeaderCell
                    key={index}
                    id="datehead"
                    style={{ cursor: "pointer" }}
                    onClick={sortFunction}
                  >
                    {ele}
                    <span id="sorticon" style={{ marginLeft: "10px" }}>
                      <i className="fa-solid fa-sort"></i>
                    </span>
                  </Table.HeaderCell>
                )
              )}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filtered.map((reported, index) => {
              return (
                <Table.Row key={reported._id} id={reported._id}>
                  <Table.Cell>{reported.bugName}</Table.Cell>
                  <Table.Cell>
                    {reported.reportedBy ? reported.reportedBy : "Anonymous"}
                  </Table.Cell>
                  <Table.Cell>
                    {reported.bugDescription.substr(0, 15) + "...."}
                  </Table.Cell>
                  <Table.Cell
                    style={
                      reported.priority === "Critical"
                        ? { background: "#EC0A00" }
                        : reported.priority === "Moderate"
                        ? { background: "#066CC3" }
                        : { background: "#08B256" }
                    }
                  >
                    {reported.priority ? reported.priority : "Low"}
                  </Table.Cell>
                  <Table.Cell>{reported.createdAt.substr(0, 10)}</Table.Cell>
                  <Table.Cell>{reported.status}</Table.Cell>
                  <Table.Cell>
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
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
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
