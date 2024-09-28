import React, { useState } from "react";
import "./UpdateHadith.css"; // Import the CSS file

const UpdateHadith = () => {
  const [chapterNumber, setChapterNumber] = useState("");
  const [hadithNumber, setHadithNumber] = useState("");
  const [hadithData, setHadithData] = useState(null);
  const [updatedHadith, setUpdatedHadith] = useState({});
  const [message, setMessage] = useState("");

  const [mixedText, setMixedText] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [textType, setTextType] = useState("");

  const fetchHadith = async () => {
    try {
      const response = await fetch(
        `https://kamil-al-ziyarat-backend-1.onrender.com/api/get-hadith/${chapterNumber}/${hadithNumber}`
      );
      const data = await response.json();
      if (response.ok) {
        setHadithData(data);
        setUpdatedHadith(data);
        setMixedText(data.mixedText || []);
        setMessage("");
      } else {
        setMessage("Hadith not found");
      }
    } catch (error) {
      setMessage("Error fetching Hadith");
    }
  };

  const handleUpdate = async () => {
    const fullUpdatedHadith = { ...updatedHadith, mixedText };
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

  const handleMixedTextChange = (e, index) => {
    const newMixedText = [...mixedText];
    newMixedText[index].text = e.target.value;
    setMixedText(newMixedText);
  };

  const addTextToMixed = () => {
    const textEntry = {
      text: currentText,
      color: textType === "urduBlack" ? "black" : "blue",
      font: textType === "urduBlack" ? "Noto Nastaliq Urdu" : "Lateef",
    };
    setMixedText([...mixedText, textEntry]);
    setCurrentText("");
    setTextType(""); // Reset text type
  };

  const removeMixedText = (index) => {
    const newMixedText = mixedText.filter((_, i) => i !== index);
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
        className="update-hadith-button unique-search-button"
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

          {mixedText.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleMixedTextChange(e, index)}
                placeholder="Mixed Text"
              />
              <button onClick={() => removeMixedText(index)}>Remove</button>
            </div>
          ))}

          <input
            type="text"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            placeholder="Add Mixed Text"
          />
          <select
            onChange={(e) => setTextType(e.target.value)}
            value={textType}
          >
            <option value="">Select Type</option>
            <option value="urduBlack">Urdu Black</option>
            <option value="blue">Blue</option>
          </select>
          <button
            onClick={addTextToMixed}
            className="update-hadith-button unique-add-button"
          >
            Add to Mixed Text
          </button>
          {message && <p className="update-hadith-message">{message}</p>}

          <button
            onClick={handleUpdate}
            className="update-hadith-button unique-update-button"
          >
            Update Hadith
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateHadith;
