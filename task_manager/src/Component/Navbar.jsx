import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Navbar = () => {
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <a className="navbar-brand" href="#">
          Task Manager
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" >
                Home 
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/login'>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/register'>
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/tasklist' >
                Task List
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
