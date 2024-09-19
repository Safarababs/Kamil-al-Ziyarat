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
  const [hadiths, setHadiths] = useState([]);
  const [currentHadith, setCurrentHadith] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        const response = await fetch(
          `https://kamil-al-ziyarat-backend-1.onrender.com/api/get-hadiths?chapterNumber=${chapterNumber}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hadiths");
        }
        const data = await response.json();
        setHadiths(data);
        const initialHadith = data.find(
          (h) => h.hadithNumber === parseInt(hadithNumber)
        );
        setCurrentHadith(initialHadith || null);
      } catch (error) {
        console.error("Error fetching hadiths:", error);
        setError(error.message);
      }
    };

    fetchHadiths();
  }, [chapterNumber, hadithNumber]);

  const handleNext = async () => {
    const currentIndex = hadiths.indexOf(currentHadith);

    if (currentIndex < hadiths.length - 1) {
      setCurrentHadith(hadiths[currentIndex + 1]);
    } else {
      const nextChapterNumber = parseInt(chapterNumber, 10) + 1;

      try {
        const response = await fetch(
          `https://kamil-al-ziyarat-backend-1.onrender.com/api/get-hadiths?chapterNumber=${nextChapterNumber}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setHadiths(data);
            setCurrentHadith(data[0]);
            navigate(`/hadith/${nextChapterNumber}/1`);
          } else {
            setError(`No hadiths available in chapter ${nextChapterNumber}.`);
          }
        } else {
          if (response.status === 404) {
            setError(`Cannot move to Chapter ${nextChapterNumber}.`);
          } else {
            setError(
              `Failed to fetch hadiths for chapter ${nextChapterNumber}.`
            );
          }
        }
      } catch (error) {
        console.error("Error fetching next chapter:", error);
        setError("An error occurred while fetching the next chapter.");
      }
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
      {error && <p className="error">{error}</p>}
      {currentHadith ? (
        <div className="hadith-card">
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
              disabled={
                !hadiths.find(
                  (h) => h.hadithNumber === parseInt(hadithNumber) + 1
                )
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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HadithDetail;
