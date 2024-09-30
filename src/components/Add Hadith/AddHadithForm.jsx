import React, { useState } from "react";
import "./AddHadithForm.css";

const API_BASE_URL = "https://kamil-al-ziyarat-backend-1.onrender.com/api";
// const API_BASE_URL = "http://localhost:5000/api";

const AddHadithForm = () => {
  const [formData, setFormData] = useState({
    user: "",
    chapterNumber: "",
    hadithNumber: "",
    bookName: "",
    raavi: "",
    redText: "",
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
        font: "Noto Nastaliq Urdu",
      },
      arabic: {
        text: currentText,
        color: "blue",
        fontSize: "1.8rem",
        fontFamily: "'Lateef', 'Amiri', serif",
        font: "Lateef",
      },
    };

    setFormData((prevData) => ({
      ...prevData,
      mixedText: [...prevData.mixedText, textType[type]],
    }));

    setCurrentText("");
    setShowTextInput({ urduBlack: false, arabic: false });
  };

  const handleMixedTextChange = (e, index) => {
    const newMixedText = [...formData.mixedText];
    newMixedText[index].text = e.target.value;
    setFormData({ ...formData, mixedText: newMixedText });
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
    if (step === 5 && !formData.bookName) {
      setError("Book Name is required.");
      return;
    }
    if (step === 6 && !formData.redText) {
      setError("red Text is required.");
      return;
    }
    if (step === 7 && !formData.arabicText) {
      setError("Arabic text is required.");
      return;
    }
    if (step === 8 && !formData.englishText) {
      setError("English text is required.");
      return;
    }

    // Move to summary step
    if (step === 10) {
      setError("");
      handleSubmit();
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

      // Reset form data
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

      // Navigate back after a brief delay
      setTimeout(() => {
        setIsSubmitted(false); // Hide success message
        setStep(1); // Reset to the first step
      }, 1000); // 2 seconds delay
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
            <div className="form-group" dir="rtl">
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
            <div className="form-group" dir="rtl">
              <input
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                placeholder="Book Name"
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

        {step === 6 && (
          <>
            <div className="form-group" dir="rtl">
              <textarea
                name="redText"
                value={formData.redText}
                onChange={handleChange}
                placeholder="Red Text"
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
            <div className="form-group" dir="rtl">
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

        {step === 8 && (
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

        {step === 9 && (
          <>
            <div className="form-group">
              <div className="add-text-buttons">
                <button
                  type="button"
                  onClick={() =>
                    setShowTextInput({ ...showTextInput, urduBlack: true })
                  }
                  style={{ backgroundColor: "green" }}
                >
                  Add Urdu Black
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setShowTextInput({ ...showTextInput, arabic: true })
                  }
                  style={{ backgroundColor: "blue" }}
                >
                  Add Arabic Text
                </button>
              </div>

              {showTextInput.urduBlack && (
                <div className="form-group" dir="rtl">
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
                    Add Text
                  </button>
                </div>
              )}

              {showTextInput.arabic && (
                <div className="form-group" dir="rtl">
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
                    Add Text
                  </button>
                </div>
              )}

              <div className="mixed-text-container">
                {formData.mixedText.map((text, index) => (
                  <div key={index} style={{ marginBottom: "10px" }} dir="rtl">
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
            </div>

            <div className="button-container">
              <button type="button" onClick={handleBackStep}>
                Back
              </button>
              <button type="button" onClick={() => setStep(10)}>
                Review Again
              </button>
            </div>
          </>
        )}
        {step === 10 && (
          <>
            <h3>Review Your Hadith</h3>
            <div className="summary-section">
              <h4>User:</h4>
              <p>{formData.user}</p>
            </div>
            <div className="summary-section">
              <h4>Chapter No:</h4>
              <p>{formData.chapterNumber}</p>
            </div>
            <div className="summary-section">
              <h4>Hadith No:</h4>
              <p>{formData.hadithNumber}</p>
            </div>
            <div className="summary-section" dir="rtl">
              <h4>Raavi:</h4>
              <p>{formData.raavi}</p>
            </div>
            <div className="summary-section" dir="rtl">
              <h4>Book Name:</h4>
              <p>{formData.bookName}</p>
            </div>
            <div className="summary-section" dir="rtl">
              <h4>Red Text:</h4>
              <p>{formData.redText}</p>
            </div>
            <div className="summary-section" dir="rtl">
              <h4>Arabic Text:</h4>
              <p>{formData.arabicText}</p>
            </div>
            <div className="summary-section">
              <h4>English Text:</h4>
              <p>{formData.englishText}</p>
            </div>
            <div className="summary-section" dir="rtl">
              <h4>Mixed Text:</h4>
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
            <div className="button-container">
              <button
                type="button"
                onClick={() => setStep(8)}
                className="back-btn"
              >
                Back to Edit
              </button>
              <button type="button" onClick={handleSubmit} disabled={isLoading}>
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
