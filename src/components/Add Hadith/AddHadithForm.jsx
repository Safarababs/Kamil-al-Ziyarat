import React, { useState } from "react";
import "./AddHadithForm.css";

const AddHadithForm = () => {
  const [formData, setFormData] = useState({
    chapterNumber: "",
    hadithNumber: "",
    user: "",
    bookName: "",
    raavi: "",
    mixedText: [],
    englishText: "",
    arabicText: "",
    redText: "",
  });

  const [showTextInput, setShowTextInput] = useState({
    urduRed: false,
    urduBlack: false,
    arabic: false,
  });

  const [currentText, setCurrentText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextInputChange = (e) => {
    setCurrentText(e.target.value);
  };

  const addTextToMixed = (type) => {
    const textType = {
      urduRed: { text: currentText, color: "red", font: "Noto Nastaliq Urdu" },
      urduBlack: {
        text: currentText,
        color: "black",
        font: "Noto Nastaliq Urdu",
      },
      arabic: { text: currentText, color: "blue", font: "Lateef" },
    };

    setFormData((prevData) => ({
      ...prevData,
      mixedText: [...prevData.mixedText, textType[type]],
    }));
    setCurrentText("");
    setShowTextInput({ urduRed: false, urduBlack: false, arabic: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      chapterNumber,
      hadithNumber,
      user,
      bookName,
      raavi,
      mixedText,
      englishText,
      arabicText,
      redText,
    } = formData;

    const chapterNum = parseInt(chapterNumber, 10);
    if (isNaN(chapterNum)) {
      setError("Chapter number must be a valid number");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://kamil-al-ziyarat-backend-1.onrender.com/api/add-hadith",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chapterNumber: chapterNum,
            hadithNumber,
            user,
            bookName,
            raavi,
            arabicText,
            mixedText,
            englishText,
            redText,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add Hadith");
        return;
      }

      console.log("Hadith added:", await response.json());
      setFormData({
        chapterNumber: "",
        hadithNumber: "",
        user: "",
        bookName: "",
        raavi: "",
        mixedText: [],
        englishText: "",
        arabicText: "",
        redText: "",
      });
      setCurrentText("");
      setError(null);
    } catch (error) {
      setError("Error submitting form. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-hadith-form-container">
      <h2>Add Your Hadiths</h2>
      <form className="add-hadith-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group">
            <select
              name="user"
              value={formData.user}
              onChange={handleChange}
              required
            >
              <option value="">Select User</option>
              <option value="Safar Abbas">Safar Abbas</option>
              <option value="Salma Batool">Salma Batool</option>
              <option value="Lubaba Jaffery">Lubaba Jaffery</option>
              <option value="Maham Batool">Maham Batool</option>
            </select>
          </div>
          <div className="form-group short-input">
            <input
              type="number"
              name="chapterNumber"
              value={formData.chapterNumber}
              onChange={handleChange}
              placeholder="Chapter No"
              required
            />
          </div>
          <div className="form-group short-input">
            <input
              type="number"
              name="hadithNumber"
              value={formData.hadithNumber}
              onChange={handleChange}
              placeholder="Hadith No"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="raavi"
              value={formData.raavi}
              onChange={handleChange}
              placeholder="Raavi"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              placeholder="Book Name"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <textarea
            name="arabicText"
            value={formData.arabicText}
            onChange={handleChange}
            placeholder="Arabic Text"
            className="arabic-text"
            required
          />
        </div>

        <div className="form-group">
          <textarea
            name="redText"
            value={formData.redText}
            onChange={handleChange}
            placeholder="Red Text"
            required
          />
        </div>

        <div className="form-group buttons">
          <div className="add-text-buttons">
            <button
              type="button"
              className="add-urdu-black-btn"
              onClick={() => setShowTextInput({ urduBlack: true })}
            >
              Add Urdu Black Text
            </button>
            <button
              type="button"
              className="add-arabic-btn"
              onClick={() => setShowTextInput({ arabic: true })}
            >
              Add Arabic Text
            </button>
          </div>
        </div>

        {showTextInput.urduBlack && (
          <div className="form-group">
            <button type="button" onClick={() => addTextToMixed("urduBlack")}>
              Add
            </button>
            <input
              type="text"
              value={currentText}
              onChange={handleTextInputChange}
              placeholder="Your Urdu Black Text Here"
              className="text-input"
            />
          </div>
        )}
        {showTextInput.arabic && (
          <div className="form-group">
            <button type="button" onClick={() => addTextToMixed("arabic")}>
              Add
            </button>
            <input
              type="text"
              value={currentText}
              onChange={handleTextInputChange}
              placeholder="Your Arabic Text Here"
              className="text-input"
            />
          </div>
        )}

        <div className="mixed-text-preview">
          {formData.mixedText.map((item, index) => (
            <span
              key={index}
              style={{
                color: item.color,
                fontFamily: item.font,
                minHeight: "300px",
              }}
            >
              {item.text}{" "}
            </span>
          ))}
        </div>

        <div className="form-group">
          <textarea
            name="englishText"
            value={formData.englishText}
            onChange={handleChange}
            placeholder="English Text"
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : "Save and Continue"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      {isLoading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default AddHadithForm;
