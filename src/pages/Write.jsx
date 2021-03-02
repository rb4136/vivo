import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-date-picker";
import { useHistory } from "react-router-dom";

import http from "../shared/http-common";
import { AuthContext } from "../shared/auth-context";

import "./Write.css";

const Write = () => {
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [date, changeDate] = useState(new Date());
  const [dateString, setDateString] = useState();

  const history = useHistory();

  const postVivo = () => {
    http
      .post(
        "/write",
        {
          title,
          date: dateString,
          content,
        },
        { headers: { Authorization: "Bearer " + auth.token } }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log("Error is " + err));
  };

  useEffect(() => {
    const month = new Date(date).toLocaleString("default", { month: "long" });
    const day = new Date(date).getDate();
    const year = new Date(date).getFullYear();
    setDateString(month + " " + day + ", " + year);
  }, [date]);

  const submitHandler = (event) => {
    event.preventDefault();
    postVivo();

    history.push("/");
  };

  const titleChangeHandler = (event) => {
    const titleInput = event.target.value;
    setTitle(titleInput);
  };

  const contentChangeHandler = (event) => {
    const contentInput = event.target.value;
    setContent(contentInput);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              onChange={titleChangeHandler}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <DatePicker
              className="calendar"
              value={date}
              onChange={changeDate}
              calendarIcon={null}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <textarea
              className="form-control"
              rows="20"
              onChange={contentChangeHandler}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Write;
