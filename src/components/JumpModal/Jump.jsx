import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { chapters } from "../Chapters/data"; // Adjust the path as needed
import "./Jump.css";

const Jump = () => {
  const [chapterNo, setChapterNo] = useState("");
  const [hadithNo, setHadithNo] = useState("");
  const [hadithPlaceholder, setHadithPlaceholder] = useState(
    "Enter hadith number"
  );
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (chapterNo) {
      const chapterKey = `Chapter ${chapterNo}`;
      const chapter = chapters[chapterKey];
      if (chapter) {
        setHadithPlaceholder(`1-${chapter.length}`);
      } else {
        setHadithPlaceholder("No hadiths available");
      }
    } else {
      setHadithPlaceholder("Enter hadith number");
    }
  }, [chapterNo]);

  const handleJump = () => {
    if (chapterNo && hadithNo) {
      const chapter = `Chapter ${chapterNo}`;
      navigate(`/chapter/${chapter}/${hadithNo}`);
      setModalVisible(false); // Hide the modal after navigating
    } else {
      alert("Please enter both chapter and hadith numbers");
    }
  };

  return (
    <div className="jump-container">
      <button
        className="jump-button"
        onClick={() => {
          console.log("Button clicked"); // Debug line
          setModalVisible(true);
        }} // Show the modal
      >
        Search Hadith by Entering Hadith No
      </button>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => {
                console.log("Close button clicked"); // Debug line
                setModalVisible(false); // Hide the modal
              }}
            >
              &times;
            </span>
            <h2>Search for Hadith</h2>
            <div>
              <label>
                Chapter No:
                <input
                  type="number"
                  value={chapterNo}
                  onChange={(e) => setChapterNo(e.target.value)}
                  placeholder="Enter chapter number"
                />
              </label>
              <label>
                Hadith No:
                <input
                  type="number"
                  value={hadithNo}
                  onChange={(e) => setHadithNo(e.target.value)}
                  placeholder={hadithPlaceholder}
                />
              </label>
              <button onClick={handleJump}>Go</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jump;
