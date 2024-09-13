// src/components/FavoritesComponent.jsx
import React, { useState, useEffect } from "react";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import "./FavoritesComponent.css"; // Import the CSS file

const FavoritesComponent = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from local storage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Hadith copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleShare = (text) => {
    const shareUrl = `${window.location.origin}`; // Get the base URL of the site
    if (navigator.share) {
      navigator
        .share({
          title: "Hadith Share",
          text: `${text} - ${shareUrl}`,
          url: shareUrl,
        })
        .catch(console.error);
    } else {
      // Fallback for browsers that do not support the Web Share API
      prompt("Copy this link to share:", `${shareUrl}\n\nHadith: ${text}`);
    }
  };

  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <ul>
        {favorites.length > 0 ? (
          favorites.map((hadith, index) => (
            <li key={index} className="hadith-card">
              <div className="hadith-text">{hadith.text}</div>
              <div className="card-buttons">
                <button
                  className="icon-button"
                  onClick={() => handleCopy(hadith.text)}
                >
                  <FaCopy />
                </button>
                <button
                  className="icon-button"
                  onClick={() => handleShare(hadith.text)}
                >
                  <FaShareAlt />
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="no-favorites">No favorites found.</li>
        )}
      </ul>
    </div>
  );
};

export default FavoritesComponent;
