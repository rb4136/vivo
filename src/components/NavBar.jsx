import React from "react";
import { NavLink } from "react-router-dom";

import minimizeButton from "../shared/minimize-menu";

import "./NavBar.css";

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand logo" to="/">
          Vivo
        </NavLink>
        {minimizeButton}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/login">
              {!props.isLoggedIn ? "Login" : "Logout"}
            </NavLink>
            {props.isLoggedIn && (
              <NavLink className="nav-link" to="/write">
                Write
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
