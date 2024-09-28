import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaCog, FaSearch, FaUser } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [chapterNumber, setChapterNumber] = useState("");
  const [hadithNumber, setHadithNumber] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (chapterNumber && hadithNumber) {
      console.log(
        `Searching for Chapter: ${chapterNumber}, Hadith: ${hadithNumber}`
      );
      navigate(`/hadith/${chapterNumber}/${hadithNumber}`);
      setModalVisible(false);
    } else {
      console.log("Please provide both Chapter and Hadith numbers.");
    }
  };

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
          <button
            className="unique-navbar-search-button" // Updated class name
            onClick={() => setModalVisible(true)}
          >
            <FaSearch className="unique-navbar-icon" />
            <span className="unique-navbar-text">Search</span>
          </button>
        </li>
        <li className="unique-navbar-item">
          <Link to="/user" className="unique-navbar-link">
            <FaUser className="unique-navbar-icon" />
            <span className="unique-navbar-text">User</span>
          </Link>
        </li>
      </ul>

      {modalVisible && (
        <div className="unique-search-modal">
          <div className="unique-search-modal-content">
            <button
              className="unique-close"
              onClick={() => setModalVisible(false)}
            >
              ×
            </button>
            <h2>Search</h2>
            <form onSubmit={handleSearch}>
              <label>
                Chapter Number:
                <input
                  type="number"
                  value={chapterNumber}
                  onChange={(e) => setChapterNumber(e.target.value)}
                  required
                />
              </label>
              <label>
                Hadith Number:
                <input
                  type="number"
                  value={hadithNumber}
                  onChange={(e) => setHadithNumber(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="unique-search-button">
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
