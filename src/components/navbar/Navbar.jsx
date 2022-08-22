import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="Navbar">
      <span className="nav-item">
        <Link to="/">Events</Link>
      </span>
      <span className="nav-item">
        <Link to="/services">Services</Link>
      </span>
    </div>
  );
};

export default Navbar;
