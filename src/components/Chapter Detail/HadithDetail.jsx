import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaAngleLeft,
  FaAngleRight,
  FaHeart,
  FaCopy,
  FaShareAlt,
} from "react-icons/fa";
import "./ChapterDetail.css";

const HadithDetail = () => {
  const { chapterNumber, hadithNumber } = useParams();
  const [currentHadith, setCurrentHadith] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHadith = async () => {
      try {
        const response = await fetch(
          `https://kamil-al-ziyarat-backend-1.onrender.com/api/get-hadith/${chapterNumber}/${hadithNumber}`
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            errorText.includes("<!DOCTYPE")
              ? "Unexpected HTML response"
              : "Failed to fetch hadith"
          );
        }

        const data = await response.json();
        setCurrentHadith(data);
      } catch (error) {
        console.error("Error fetching hadith:", error);
        setError(error.message);
      }
    };

    fetchHadith();
  }, [chapterNumber, hadithNumber]);

  const handleNext = async () => {
    const nextHadithNumber = parseInt(hadithNumber, 10) + 1;

    try {
      const response = await fetch(
        `https://kamil-al-ziyarat-backend-1.onrender.com/api/get-hadith/${chapterNumber}/${nextHadithNumber}`
      );

      if (response.ok) {
        const data = await response.json();
        setCurrentHadith(data);
        navigate(`/hadith/${chapterNumber}/${nextHadithNumber}`);
      } else {
        setError("No next hadith available.");
      }
    } catch (error) {
      console.error("Error fetching next hadith:", error);
      setError("An error occurred while fetching the next hadith.");
    }
  };

  const handlePrevious = async () => {
    const previousHadithNumber = parseInt(hadithNumber, 10) - 1;

    try {
      const response = await fetch(
        `https://kamil-al-ziyarat-backend-1.onrender.com/api/get-hadith/${chapterNumber}/${previousHadithNumber}`
      );

      if (response.ok) {
        const data = await response.json();
        setCurrentHadith(data);
        navigate(`/hadith/${chapterNumber}/${previousHadithNumber}`);
      } else {
        setError("No previous hadith available.");
      }
    } catch (error) {
      console.error("Error fetching previous hadith:", error);
      setError("An error occurred while fetching the previous hadith.");
    }
  };

  return (
    <div className="chapter-detail-container">
      {error && <p className="error">{error}</p>}
      {currentHadith ? (
        <div className="hadith-card">
          <h2>Chapter No: {currentHadith.chapterNumber}</h2>
          <div className="hadith-header">
            <button
              className="nav-button"
              onClick={handlePrevious}
              disabled={parseInt(hadithNumber) === 1}
            >
              <FaAngleLeft /> Prev
            </button>
            <div className="hadith-number">
              Hadith No {currentHadith.hadithNumber}
            </div>
            <button
              className="nav-button"
              onClick={handleNext}
              disabled={!currentHadith || currentHadith.hadithNumber >= 10} // Adjust as necessary
            >
              Next <FaAngleRight />
            </button>
          </div>
          <div className="hadith-content">
            <div className="arabic-text">{currentHadith.arabicText}</div>
            <div className="raavi">{currentHadith.raavi}</div>
            <div className="mixed-text-preview">
              {currentHadith.mixedText.map((item, index) => (
                <span
                  key={index}
                  style={{
                    color: item.color,
                    fontFamily: item.font,
                  }}
                >
                  {item.text}{" "}
                </span>
              ))}
            </div>

            <div className="black-text-two">
              راوی: {currentHadith.raavi} ... (حوالہ جات){" "}
              {currentHadith.bookName}
            </div>
            <div className="black-text-two">
              Contributed By: {currentHadith.user}
            </div>
            <div className="english-text">{currentHadith.englishText}</div>
          </div>
          <div className="copy-share-buttons">
            <button className="icon-button">
              <FaCopy />
            </button>
            <button className="icon-button">
              <FaShareAlt />
            </button>
            <button className="icon-button">
              <FaHeart />
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HadithDetail;
