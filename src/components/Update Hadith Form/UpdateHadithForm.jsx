import React, { useState } from "react";
import "./UpdateHadith.css"; // Import the CSS file

const UpdateHadith = () => {
  const [chapterNumber, setChapterNumber] = useState("");
  const [hadithNumber, setHadithNumber] = useState("");
  const [hadithData, setHadithData] = useState(null);
  const [updatedHadith, setUpdatedHadith] = useState({});
  const [message, setMessage] = useState("");

  // New state for managing mixed text
  const [mixedText, setMixedText] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [textType, setTextType] = useState(""); // To track type of text (Urdu/Arabic)

  const fetchHadith = async () => {
    try {
      const response = await fetch(
        `https://kamil-al-ziyarat-backend-1.onrender.com/api/get-hadith/${chapterNumber}/${hadithNumber}`
      );
      const data = await response.json();
      if (data) {
        setHadithData(data);
        setUpdatedHadith(data);
        setMixedText(data.mixedText || []); // Set mixed text for editing
        setMessage(""); // Clear previous messages
      } else {
        setMessage("Hadith not found");
      }
    } catch (error) {
      setMessage("Error fetching Hadith");
    }
  };

  const handleUpdate = async () => {
    const fullUpdatedHadith = { ...updatedHadith, mixedText }; // Include mixed text in update
    try {
      const response = await fetch(
        `https://kamil-al-ziyarat-backend-1.onrender.com/api/update-hadith/${hadithData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fullUpdatedHadith),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setMessage("Hadith updated successfully!");
        setHadithData(result);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage("Error updating Hadith");
    }
  };

  const handleTextInputChange = (e) => {
    setCurrentText(e.target.value);
  };

  const addTextToMixed = (type) => {
    const textEntry = {
      text: currentText,
      color: type === "urduBlack" ? "black" : "blue",
      fontSize: type === "urduBlack" ? "1.2rem" : "1.8rem",
      fontFamily:
        type === "urduBlack"
          ? "'Noto Nastaliq Urdu', serif"
          : "'Lateef', 'Amiri', serif",
    };

    setMixedText([...mixedText, textEntry]);
    setCurrentText("");
    setTextType(""); // Reset text type
  };

  const handleMixedTextChange = (e, index) => {
    const newMixedText = [...mixedText];
    newMixedText[index].text = e.target.value;
    setMixedText(newMixedText);
  };

  return (
    <div className="unique-update-hadith-container">
      <h2 className="update-hadith-title">Update Hadith</h2>

      <input
        className="update-hadith-input chapter-number"
        type="text"
        placeholder="Chapter Number"
        value={chapterNumber}
        onChange={(e) => setChapterNumber(e.target.value)}
      />
      <input
        className="update-hadith-input hadith-number"
        type="text"
        placeholder="Hadith Number"
        value={hadithNumber}
        onChange={(e) => setHadithNumber(e.target.value)}
      />

      <button
        className="update-hadith-button search-button"
        onClick={fetchHadith}
      >
        Search
      </button>

      {message && <p className="update-hadith-message">{message}</p>}

      {hadithData && (
        <>
          <input
            className="update-hadith-input user-name"
            type="text"
            placeholder="Username"
            value={updatedHadith.user || ""}
            onChange={(e) =>
              setUpdatedHadith({ ...updatedHadith, user: e.target.value })
            }
          />
          <input
            className="update-hadith-input chapter-name"
            type="text"
            placeholder="Chapter Name"
            value={updatedHadith.chapterName || ""}
            onChange={(e) =>
              setUpdatedHadith({
                ...updatedHadith,
                chapterName: e.target.value,
              })
            }
          />
          <input
            className="update-hadith-input raavi"
            type="text"
            value={updatedHadith.raavi || ""}
            onChange={(e) =>
              setUpdatedHadith({ ...updatedHadith, raavi: e.target.value })
            }
            placeholder="Raavi"
          />
          <input
            className="update-hadith-input book-name"
            type="text"
            value={updatedHadith.bookName || ""}
            onChange={(e) =>
              setUpdatedHadith({ ...updatedHadith, bookName: e.target.value })
            }
            placeholder="Book Name"
          />
          <textarea
            className="update-hadith-textarea arabic-text"
            value={updatedHadith.arabicText || ""}
            onChange={(e) =>
              setUpdatedHadith({ ...updatedHadith, arabicText: e.target.value })
            }
            placeholder="Arabic Text"
          />
          <textarea
            className="update-hadith-textarea english-text"
            value={updatedHadith.englishText || ""}
            onChange={(e) =>
              setUpdatedHadith({
                ...updatedHadith,
                englishText: e.target.value,
              })
            }
            placeholder="English Text"
          />

          <div>
            <button type="button" onClick={() => setTextType("urduBlack")}>
              Add Urdu Black
            </button>
            <button type="button" onClick={() => setTextType("arabic")}>
              Add Arabic Text
            </button>
          </div>

          {textType && (
            <div>
              <textarea
                value={currentText}
                onChange={handleTextInputChange}
                placeholder={`Your ${
                  textType === "urduBlack" ? "Urdu" : "Arabic"
                } Text Here`}
              />
              <button
                type="button"
                onClick={() => {
                  addTextToMixed(textType);
                }}
              >
                Add to Mixed Text
              </button>
            </div>
          )}

          <div className="mixed-text-container">
            {mixedText.map((text, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <textarea
                  value={text.text}
                  onChange={(e) => handleMixedTextChange(e, index)}
                  style={{
                    color: text.color,
                    fontSize: text.fontSize,
                    fontFamily: text.fontFamily,
                    width: "100%",
                    minHeight: "50px",
                  }}
                />
              </div>
            ))}
          </div>

          <button
            className="update-hadith-button update-button"
            onClick={handleUpdate}
          >
            Update Hadith
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateHadith;
