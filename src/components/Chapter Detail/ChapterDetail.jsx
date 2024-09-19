import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaAngleLeft,
  FaAngleRight,
  FaHeart,
  FaCopy,
  FaShareAlt,
} from "react-icons/fa";

import "./ChapterDetail.css";

const ChapterDetail = () => {
  const { chapterNumber } = useParams();
  const [hadiths, setHadiths] = useState([]);
  const [chapterName, setChapterName] = useState("");
  const [currentHadith, setCurrentHadith] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        const response = await fetch(
          `https://kamil-al-ziyarat-backend-1.onrender.com/api/get-hadiths?chapterNumber=${chapterNumber}`
        );
        if (response.ok) {
          const data = await response.json();
          setHadiths(data);
          setCurrentHadith(data[0] || null); // Set the first hadith or null if no hadiths
        } else {
          setError("Failed to fetch Hadiths");
        }
      } catch (error) {
        setError("Error fetching Hadiths");
      }
    };

    const fetchChapterName = async () => {
      try {
        const response = await fetch(
          "https://kamil-al-ziyarat-backend-1.onrender.com/api/get-chapters"
        );
        if (response.ok) {
          const chapters = await response.json();
          const chapter = chapters.find(
            (c) => c.number === parseInt(chapterNumber, 10)
          );
          if (chapter) {
            setChapterName(chapter.name);
          } else {
            setError("Chapter not found");
          }
        } else {
          setError("Failed to fetch chapters");
        }
      } catch (error) {
        setError("Error fetching chapters");
      }
    };

    fetchHadiths();
    fetchChapterName();
  }, [chapterNumber]);

  const handleNext = () => {
    const currentIndex = hadiths.indexOf(currentHadith);
    if (currentIndex < hadiths.length - 1) {
      setCurrentHadith(hadiths[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = hadiths.indexOf(currentHadith);
    if (currentIndex > 0) {
      setCurrentHadith(hadiths[currentIndex - 1]);
    }
  };

  return (
    <div className="chapter-detail-container">
      <h2>{chapterName}</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      {currentHadith ? (
        <div className="hadith-card">
          <div className="hadith-header">
            <button
              className="nav-button"
              onClick={handlePrevious}
              disabled={!hadiths.length || hadiths.indexOf(currentHadith) === 0}
            >
              <FaAngleLeft /> Prev
            </button>
            <div className="hadith-number">
              Hadith No {currentHadith.hadithNumber}
            </div>
            <button
              className="nav-button"
              onClick={handleNext}
              disabled={
                !hadiths.length ||
                hadiths.indexOf(currentHadith) === hadiths.length - 1
              }
            >
              Next <FaAngleRight />
            </button>
          </div>
          <div className="hadith-content">
            <div className="arabic-text">{currentHadith.arabicText}</div>
            <div className="raavi">{currentHadith.raavi}</div>
            <div className="black-text-one">{currentHadith.blackTextOne}</div>
            <div className="black-text-two">
              راوی: {currentHadith.blackTextTwo} ... (حوالہ جات)
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
        <p>No Hadiths available</p>
      )}
    </div>
  );
};

export default ChapterDetail;
