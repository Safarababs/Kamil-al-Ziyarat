import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCog, FaSearch, FaUser } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="unique-navbar">
      <ul className="unique-navbar-list">
        <li className="unique-navbar-item">
          <Link to="/" className="unique-navbar-link">
            <FaHome className="unique-navbar-icon" />
            <span className="unique-navbar-text">Home</span>
          </Link>
        </li>
        <li className="unique-navbar-item">
          <Link to="/settings" className="unique-navbar-link">
            <FaCog className="unique-navbar-icon" />
            <span className="unique-navbar-text">Settings</span>
          </Link>
        </li>
        <li className="unique-navbar-item">
          <Link to="/safar" className="unique-navbar-link">
            <FaSearch className="unique-navbar-icon" />
            <span className="unique-navbar-text">Search</span>
          </Link>
        </li>

        <li className="unique-navbar-item">
          <Link to="/user" className="unique-navbar-link">
            <FaUser className="unique-navbar-icon" />
            <span className="unique-navbar-text">User</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
