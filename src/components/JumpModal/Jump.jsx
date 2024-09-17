import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Jump.css";

const Jump = ({ onClose }) => {
  const [chapterNo, setChapterNo] = useState("");
  const [hadithNo, setHadithNo] = useState("");
  const navigate = useNavigate();

  const handleJump = () => {
    if (chapterNo && hadithNo) {
      navigate(`/chapter/${chapterNo}?hadithNumber=${hadithNo}`);
      onClose();
    } else {
      alert("Please enter both chapter and hadith numbers");
    }
  };

  return (
    <div className="jump-modal">
      <div className="jump-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Search for Hadihts</h2>
        <div>
          <label>
            Chapter No:
            <input
              type="number"
              value={chapterNo}
              onChange={(e) => setChapterNo(e.target.value)}
              placeholder="Chapter No"
            />
          </label>
          <label>
            Hadith No:
            <input
              type="number"
              value={hadithNo}
              onChange={(e) => setHadithNo(e.target.value)}
              placeholder="Hadiths Number"
            />
          </label>
          <button onClick={handleJump}>Go</button>
        </div>
      </div>
    </div>
  );
};

export default Jump;
