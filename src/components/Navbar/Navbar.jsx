import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCog, FaSearch, FaArrowRight } from "react-icons/fa";
import Jump from "../JumpModal/Jump";
import "./Navbar.css";

const Navbar = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            <FaHome className="navbar-icon" />
            <span className="navbar-text">Home</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/settings" className="navbar-link">
            <FaCog className="navbar-icon" />
            <span className="navbar-text">Settings</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/search" className="navbar-link">
            <FaSearch className="navbar-icon" />
            <span className="navbar-text">Search</span>
          </Link>
        </li>
        <li className="navbar-item jump-button">
          <button
            className="navbar-link jump-btn"
            onClick={() => setModalVisible(true)}
          >
            <FaArrowRight className="jump-icon" />
            <span className="navbar-text">Jump</span>
          </button>
        </li>
      </ul>
      {modalVisible && <Jump onClose={() => setModalVisible(false)} />}
    </nav>
  );
};

export default Navbar;
