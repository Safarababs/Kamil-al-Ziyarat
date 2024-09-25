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
  const [currentHadithIndex, setCurrentHadithIndex] = useState(0);
  const [chapterName, setChapterName] = useState("");
  const [error, setError] = useState(null);
  const [inputChapter, setInputChapter] = useState(chapterNumber);
  const [inputHadith, setInputHadith] = useState("1");

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        const response = await fetch(
          "https://kamil-al-ziyarat-backend-1.onrender.com/api/get-all-hadiths"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Hadiths");
        }

        const data = await response.json();
        setHadiths(data);
        setCurrentHadithIndex(0); // Reset to first hadith
      } catch (error) {
        setError("Error fetching Hadiths");
        console.error("Fetch error:", error);
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

  const handleSearch = () => {
    const index = hadiths.findIndex(
      (hadith) =>
        hadith.chapterNumber === parseInt(inputChapter) &&
        hadith.hadithNumber === inputHadith
    );
    if (index !== -1) {
      setCurrentHadithIndex(index);
    } else {
      setError(
        "Hadith not found. Please check the chapter and hadith numbers."
      );
    }
  };

  const handleNext = () => {
    if (currentHadithIndex < hadiths.length - 1) {
      setCurrentHadithIndex(currentHadithIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentHadithIndex > 0) {
      setCurrentHadithIndex(currentHadithIndex - 1);
    }
  };

  const currentHadith = hadiths.filter(
    (hadith) => hadith.chapterNumber === parseInt(chapterNumber, 10)
  )[currentHadithIndex];

  return (
    <div className="chapter-detail-container">
      <h2>{chapterName}</h2>
      {error && <p className="error">{error}</p>}

      <div className="filter-container">
        <input
          type="number"
          value={inputChapter}
          onChange={(e) => setInputChapter(e.target.value)}
          placeholder="Chapter Number"
        />
        <input
          type="text"
          value={inputHadith}
          onChange={(e) => setInputHadith(e.target.value)}
          placeholder="Hadith Number"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {currentHadith ? (
        <div className="hadith-card">
          <div className="hadith-header">
            <button
              className="nav-button"
              onClick={handlePrevious}
              disabled={currentHadithIndex === 0}
            >
              <FaAngleLeft /> Prev
            </button>
            <div className="hadith-number">
              <h2>Chapter No: {currentHadith.chapterNumber}</h2> Hadith No{" "}
              {currentHadith.hadithNumber}
            </div>
            <button
              className="nav-button"
              onClick={handleNext}
              disabled={currentHadithIndex === hadiths.length - 1}
            >
              Next <FaAngleRight />
            </button>
          </div>
          <div className="hadith-content">
            <div className="arabic-text">{currentHadith.arabicText}</div>
            <div className="raavi">{currentHadith.raavi}</div>
            {currentHadith.mixedText &&
              currentHadith.mixedText.map((item, index) => (
                <div
                  key={index}
                  style={{ color: item.color, fontFamily: item.font }}
                >
                  {item.text}
                </div>
              ))}
            <div className="black-text-one">{currentHadith.blackTextOne}</div>
            <div className="black-text-two">
              راوی: {currentHadith.blackTextTwo} ... (حوالہ جات){" "}
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
