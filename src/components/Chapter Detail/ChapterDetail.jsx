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

  // Memoize chapterData to avoid unnecessary recalculations
  const chapterData = useMemo(
    () => chapters[decodeURIComponent(chapterName)] || [],
    [chapterName]
  );

  const [currentHadith, setCurrentHadith] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const initialHadith =
      chapterData.find(
        (hadith) => hadith.number === parseInt(hadithNumber, 10)
      ) || chapterData[0];
    setCurrentHadith(initialHadith);
  }, [hadithNumber, chapterData]);

  const handleNext = () => {
    const nextHadith = chapterData.find(
      (hadith) => hadith.number === currentHadith.number + 1
    );
    if (nextHadith) {
      setCurrentHadith(nextHadith);
    } else {
      console.warn("No next hadith found.");
    }
  };

  const handlePrevious = () => {
    const previousHadith = chapterData.find(
      (hadith) => hadith.number === currentHadith.number - 1
    );
    if (previousHadith) {
      setCurrentHadith(previousHadith);
    } else {
      console.warn("No previous hadith found.");
    }
  };

  const handleCopy = () => {
    if (currentHadith.text) {
      navigator.clipboard
        .writeText(currentHadith.text)
        .then(() => alert("Hadith copied to clipboard!"))
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          alert("Failed to copy text. Please try again.");
        });
    } else {
      alert("No text to copy.");
    }
  };

  const handleFavorite = () => {
    const updatedFavorites = favorites.includes(currentHadith)
      ? favorites.filter((f) => f !== currentHadith)
      : [...favorites, currentHadith];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);

  const handleShareText = () => {
    const textToShare = currentHadith.text;
    const shareUrl = `${window.location.origin}/chapter/${encodeURIComponent(
      chapterName
    )}/${currentHadith.number}`;
    const shareText = `${textToShare}\n\nRead more: ${shareUrl}`;

    if (navigator.share) {
      navigator
        .share({
          title: `Hadith ${currentHadith.number}`,
          text: shareText,
        })
        .then(() => console.log("Text shared successfully"))
        .catch((err) => console.error("Error sharing text:", err));
    } else {
      navigator.clipboard
        .writeText(shareText)
        .then(() => alert("Text copied to clipboard!"))
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          alert("Failed to copy text. Please try again.");
        });
    }
    closeShareModal();
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/chapter/${encodeURIComponent(
      chapterName
    )}/${currentHadith.number}`;
    const textToCopy = `${currentHadith.text}\n\nRead more: ${shareUrl}`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => alert("Text and link copied to clipboard!"))
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy text. Please try again.");
      });
    closeShareModal();
  };

  const handleShareAsImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const text = currentHadith.text;
    const headerText = `Hadith No ${currentHadith.number}`;
    const footerText = `Chapter: ${decodeURIComponent(chapterName)}`;

    if (!text) {
      alert("No text to convert to image.");
      closeShareModal();
      return;
    }

    // Set canvas dimensions and styles
    canvas.width = 800; // Adjust width as needed
    canvas.height = 600; // Adjust height as needed
    context.fillStyle = "#ffffff"; // Background color
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000000"; // Text color
    context.font = '24px "Noto Nastaliq Urdu", serif'; // Urdu font
    context.textAlign = "center";

    // Draw header
    context.font = '30px "Noto Nastaliq Urdu", serif'; // Larger font for header
    context.fillText(headerText, canvas.width / 2, 40);

    // Draw text
    context.font = '24px "Noto Nastaliq Urdu", serif';
    const lines = text.split("\n");
    const lineHeight = 30;
    let y = 80; // Start position for text

    lines.forEach((line) => {
      context.fillText(line, canvas.width / 2, y);
      y += lineHeight;
    });

    // Draw footer
    context.font = '20px "Noto Nastaliq Urdu", serif'; // Smaller font for footer
    context.fillText(footerText, canvas.width / 2, canvas.height - 40);

    // Convert canvas to image
    const imageUrl = canvas.toDataURL("image/png");

    // Create a link to download the image
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `hadith_${currentHadith.number}.png`;
    link.click();

    closeShareModal();
  };

  return (
    <div className="chapter-detail-container">
      <h2>{decodeURIComponent(chapterName)}</h2>
      <div className="hadith-card">
        <div className="hadith-header">
          <button
            className="nav-button"
            onClick={handlePrevious}
            disabled={currentHadith.number <= 1}
          >
            <FaAngleLeft /> Prev
          </button>
          <div className="hadith-number">Hadith No {currentHadith.number}</div>
          <button
            className="nav-button"
            onClick={handleNext}
            disabled={currentHadith.number >= chapterData.length}
          >
            Next <FaAngleRight />
          </button>
        </div>
        <div className="hadith-content">
          {currentHadith.text &&
            currentHadith.text
              .split("\n")
              .map((line, index) => <span key={index}>{line}</span>)}
        </div>
        <div className="copy-share-buttons">
          <button className="icon-button" onClick={handleCopy}>
            <FaCopy />
          </button>
          <button className="icon-button" onClick={openShareModal}>
            <FaShareAlt />
          </button>
          <button className="icon-button" onClick={handleFavorite}>
            <FaHeart />
          </button>
        </div>
        {isShareModalOpen && (
          <div className="share-modal">
            <div className="share-modal-content">
              <span className="share-close" onClick={closeShareModal}>
                &times;
              </span>
              <h2>Share Hadith</h2>
              <button onClick={handleShareText}>Share as Text with Link</button>
              <button onClick={handleCopyLink}>Copy Text and Link</button>
              <button onClick={handleShareAsImage}>Share as Image</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterDetail;
