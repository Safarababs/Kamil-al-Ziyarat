import React, { useState } from "react";
import "./AddHadithForm.css";

const API_BASE_URL = "https://kamil-al-ziyarat-backend-1.onrender.com/api";

const AddHadithForm = () => {
  const [formData, setFormData] = useState({
    user: "",
    chapterNumber: "",
    hadithNumber: "",
    bookName: "",
    raavi: "",
    mixedText: [],
    arabicText: "",
    englishText: "",
  });

  const [showTextInput, setShowTextInput] = useState({
    urduBlack: false,
    arabic: false,
  });

  const [currentText, setCurrentText] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextInputChange = (e) => {
    setCurrentText(e.target.value);
  };

  const addTextToMixed = (type) => {
    const textType = {
      urduBlack: {
        text: currentText,
        color: "black",
        fontSize: "1.2rem",
        fontFamily: "'Noto Nastaliq Urdu', serif",
      },
      arabic: {
        text: currentText,
        color: "blue",
        fontSize: "1.8rem",
        fontFamily: "'Lateef', 'Amiri', serif",
      },
    };

    setFormData((prevData) => ({
      ...prevData,
      mixedText: [...prevData.mixedText, textType[type]],
    }));

    setCurrentText("");
    setShowTextInput({ urduBlack: false, arabic: false });
  };

  const handleNextStep = () => {
    if (step === 1 && !formData.user) {
      setError("User is required.");
      return;
    }
    if (step === 2 && !formData.chapterNumber) {
      setError("Chapter number is required.");
      return;
    }
    if (step === 3 && !formData.hadithNumber) {
      setError("Hadith number is required.");
      return;
    }
    if (step === 4 && !formData.raavi) {
      setError("Raavi is required.");
      return;
    }
    if (step === 6 && !formData.arabicText) {
      setError("Arabic text is required.");
      return;
    }
    if (step === 7 && !formData.englishText) {
      setError("English text is required.");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const addHadith = async (hadithData) => {
    console.log("Submitting Hadith:", hadithData);

    const response = await fetch(`${API_BASE_URL}/add-hadith`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hadithData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);
      throw new Error(
        `Error adding hadith: ${errorData.message || response.statusText}`
      );
    }

    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (formData.mixedText.length === 0) {
        setError("Please add mixed text before submitting.");
        return;
      }

      const response = await addHadith(formData); // This is the internal function
      console.log("Hadith submitted:", response);
      setIsSubmitted(true);
      setFormData({
        user: "",
        chapterNumber: "",
        hadithNumber: "",
        bookName: "",
        raavi: "",
        mixedText: [],
        arabicText: "",
        englishText: "",
      });
    } catch (error) {
      console.error("Error submitting hadith:", error.message);
      setError("Failed to submit Hadith. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-hadith-form-container">
      <h2>Add Your Hadiths</h2>
      {error && <p className="error">{error}</p>}
      {isSubmitted && <p className="success">Hadith submitted successfully!</p>}
      <form className="add-hadith-form" onSubmit={handleSubmit}>
        {step === 1 && (
          <>
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
            <div className="button-container">
              <button type="button" onClick={handleNextStep}>
                Save and Continue
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
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
            <div className="button-container">
              <button type="button" onClick={handleBackStep}>
                Back
              </button>
              <button type="button" onClick={handleNextStep}>
                Save and Continue
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
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
            <div className="button-container">
              <button type="button" onClick={handleBackStep}>
                Back
              </button>
              <button type="button" onClick={handleNextStep}>
                Save and Continue
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="form-group">
              <input
                name="raavi"
                value={formData.raavi}
                onChange={handleChange}
                placeholder="Raavi"
                required
              />
            </div>
            <div className="button-container">
              <button type="button" onClick={handleBackStep}>
                Back
              </button>
              <button type="button" onClick={handleNextStep}>
                Save and Continue
              </button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <div className="form-group">
              <input
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                placeholder="Book Name (optional)"
              />
            </div>
            <div className="button-container">
              <button type="button" onClick={handleBackStep}>
                Back
              </button>
              <button type="button" onClick={handleNextStep}>
                Save and Continue
              </button>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <div className="form-group">
              <textarea
                name="arabicText"
                value={formData.arabicText}
                onChange={handleChange}
                placeholder="Arabic Text"
                required
                rows="4"
              />
            </div>
            <div className="button-container">
              <button type="button" onClick={handleBackStep}>
                Back
              </button>
              <button type="button" onClick={handleNextStep}>
                Save and Continue
              </button>
            </div>
          </>
        )}

        {step === 7 && (
          <>
            <div className="form-group">
              <textarea
                name="englishText"
                value={formData.englishText}
                onChange={handleChange}
                placeholder="English Text"
                required
                rows="4"
              />
            </div>
            <div className="button-container">
              <button type="button" onClick={handleBackStep}>
                Back
              </button>
              <button type="button" onClick={handleNextStep}>
                Save and Continue
              </button>
            </div>
          </>
        )}

        {step === 8 && (
          <>
            <div className="form-group">
              <div className="add-text-buttons">
                <button
                  type="button"
                  onClick={() =>
                    setShowTextInput({ ...showTextInput, urduBlack: true })
                  }
                >
                  Add Urdu Black
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setShowTextInput({ ...showTextInput, arabic: true })
                  }
                >
                  Add Arabic Text
                </button>
              </div>

              {showTextInput.urduBlack && (
                <div className="form-group">
                  <textarea
                    value={currentText}
                    onChange={handleTextInputChange}
                    placeholder="Your Urdu Text Here"
                    rows="4"
                  />
                  <button
                    type="button"
                    onClick={() => addTextToMixed("urduBlack")}
                  >
                    Add to Mixed Text
                  </button>
                </div>
              )}

              {showTextInput.arabic && (
                <div className="form-group">
                  <textarea
                    value={currentText}
                    onChange={handleTextInputChange}
                    placeholder="Your Arabic Text Here"
                    rows="4"
                  />
                  <button
                    type="button"
                    onClick={() => addTextToMixed("arabic")}
                  >
                    Add to Mixed Text
                  </button>
                </div>
              )}

              <div className="mixed-text-container">
                {formData.mixedText.map((text, index) => (
                  <p
                    key={index}
                    style={{
                      color: text.color,
                      fontSize: text.fontSize,
                      fontFamily: text.fontFamily,
                    }}
                  >
                    {text.text}
                  </p>
                ))}
              </div>
            </div>

            <div className="button-container">
              <button type="button" onClick={handleBackStep}>
                Back
              </button>
              <button type="submit" disabled={isLoading}>
                {isLoading ? <span className="spinner"></span> : "Submit"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AddHadithForm;
