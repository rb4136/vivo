import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../shared/auth-context";
import http from "../shared/http-common";

const Login = (props) => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const logout = () => {
    auth.logout();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    http
      .post("/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (!res.data.existingUser) {
          console.log("That was an invalid entry.");
        } else {
          auth.login(res.data.token);
          console.log("Yay! You're logged in!");
          console.log(res.data);
        }
      })
      .catch((err) => console.log("Error is " + err));
    history.push("/");
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  if (auth.token) {
    return (
      <div>
        <button onClick={logout} className="btn btn-outline-dark">
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={submitHandler}>
          <div className="row mb-3 w-50">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                name="username"
                onChange={usernameChangeHandler}
                value={username}
              />
            </div>
          </div>
          <div className="row mb-3 w-50">
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                onChange={passwordChangeHandler}
                value={password}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-outline-dark">
            Submit
          </button>
        </form>
      </div>
    );
  }
};

export default Login;
