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
      // Navigate to HadithDetail with chapterNumber and hadithNumber
      navigate(`/hadith/${chapterNumber}/${hadithNumber}`);
      setModalVisible(false);
    }
  };

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
          <button className="navbar-link" onClick={() => setModalVisible(true)}>
            <FaSearch className="navbar-icon" />
            <span className="navbar-text">Search Hadith</span>
          </button>
        </li>
        <li className="navbar-item">
          <Link to="/user" className="navbar-link">
            <FaUser className="navbar-icon" />
            <span className="navbar-text">User</span>
          </Link>
        </li>
      </ul>

      {modalVisible && (
        <div className="search-modal">
          <div className="search-modal-content">
            <button className="close" onClick={() => setModalVisible(false)}>
              ×
            </button>
            <h2>Search Hadith</h2>
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
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
