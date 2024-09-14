import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { chapters } from "../Chapters/data";
import {
  FaAngleLeft,
  FaAngleRight,
  FaHeart,
  FaCopy,
  FaShareAlt,
} from "react-icons/fa";
import "./ChapterDetail.css";

const ChapterDetail = () => {
  const { chapterName, hadithNumber } = useParams();

  const chapterData = useMemo(
    () => chapters[decodeURIComponent(chapterName)] || [],
    [chapterName]
  );

  const [currentHadith, setCurrentHadith] = useState({});

  useEffect(() => {
    const initialHadith =
      chapterData.find(
        (hadith) => hadith.hadithNumber === parseInt(hadithNumber, 10)
      ) || chapterData[0];
    setCurrentHadith(initialHadith);
  }, [hadithNumber, chapterData]);

  const handleNext = () => {
    const nextHadith = chapterData.find(
      (hadith) => hadith.hadithNumber === currentHadith.hadithNumber + 1
    );
    if (nextHadith) {
      setCurrentHadith(nextHadith);
    } else {
      console.warn("No next hadith found.");
    }
  };

  const handlePrevious = () => {
    const previousHadith = chapterData.find(
      (hadith) => hadith.hadithNumber === currentHadith.hadithNumber - 1
    );
    if (previousHadith) {
      setCurrentHadith(previousHadith);
    } else {
      console.warn("No previous hadith found.");
    }
  };

  return (
    <div className="chapter-detail-container">
      <h2>{decodeURIComponent(chapterName)}</h2>
      <div className="hadith-card">
        <div className="hadith-header">
          <button
            className="nav-button"
            onClick={handlePrevious}
            disabled={currentHadith.hadithNumber <= 1}
          >
            <FaAngleLeft /> Prev
          </button>
          <div className="hadith-number">
            Hadith No {currentHadith.hadithNumber}
          </div>
          <button
            className="nav-button"
            onClick={handleNext}
            disabled={currentHadith.hadithNumber >= chapterData.length}
          >
            Next <FaAngleRight />
          </button>
        </div>
        <div className="hadith-content">
          <div className="raavi">{currentHadith.raavi}</div>
          <div className="black-text-one">{currentHadith.blackTextOne}</div>
          <div className="arabic-text">{currentHadith.arabicText}</div>
          <div className="black-text-two">{currentHadith.blackTextTwo}</div>
        </div>
        <div className="copy-share-buttons">
          <button
            className="icon-button"
            onClick={() => {
              /* copy functionality */
            }}
          >
            <FaCopy />
          </button>
          <button
            className="icon-button"
            onClick={() => {
              /* share functionality */
            }}
          >
            <FaShareAlt />
          </button>
          <button
            className="icon-button"
            onClick={() => {
              /* favorite functionality */
            }}
          >
            <FaHeart />
          </button>
        </div>
        {/* Add Share Modal if needed */}
      </div>
    </div>
  );
};

export default ChapterDetail;
