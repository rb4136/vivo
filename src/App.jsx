import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import BlogList from "./components/BlogList";
import Blog from "./pages/Blog";
import Write from "./pages/Write";
import Login from "./pages/Login";
import Edit from "./pages/Edit";
import { AuthContext } from "./shared/auth-context";
import { useAuth } from "./shared/auth-hook";

import "./index.css";

const App = () => {
  const { token, login, logout } = useAuth();

  const routes = (
    <Switch>
      <Route path="/" exact>
        {token ? <BlogList /> : <div>Please log in.</div>}
      </Route>
      <Route path="/write" exact>
        <Write />
      </Route>
      <Route path="/login" exact>
        <Login loginHandler={login} />
      </Route>
      <Route path="/:vivoid" exact>
        <Blog />
      </Route>
      <Route path="/:vivoid/edit" exact>
        <Edit />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <div className="whole"></div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <NavBar isLoggedIn={token} />
              <div className="bloglist">
                <div>{routes}</div>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
