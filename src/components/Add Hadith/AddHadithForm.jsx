import React, { useState } from "react";
import "./AddHadithForm.css";

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
    redText: "",
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
    // Clear any previous error
    setError("");
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const handlePreviewChange = (e) => {
    const newText = e.target.innerText;
    const lines = newText.split("\n");
    const updatedMixedText = lines.map((line) => ({
      text: line,
      color: "black",
      fontSize: "1.2rem",
    }));

    setFormData((prevData) => ({
      ...prevData,
      mixedText: updatedMixedText,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // Simulate a successful submission
      setIsLoading(false);
      setIsSubmitted(true);
      // Reset form data if needed
      setFormData({
        user: "",
        chapterNumber: "",
        hadithNumber: "",
        bookName: "",
        raavi: "",
        mixedText: [],
        arabicText: "",
        englishText: "",
        redText: "",
      });
      setStep(1); // Reset to step 1
    }, 2000); // Simulating network delay
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
                className="arabic-text"
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
                    placeholder="Your Urdu Black Text Here"
                    className="text-input"
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
                    className="text-input"
                  />
                  <button
                    type="button"
                    onClick={() => addTextToMixed("arabic")}
                  >
                    Add to Mixed Text
                  </button>
                </div>
              )}

              <div>
                <h4>Mixed Text Preview</h4>
                <div
                  className="mixed-text-preview"
                  onInput={handlePreviewChange}
                >
                  {formData.mixedText.map((item, index) => (
                    <span
                      key={index}
                      style={{
                        color: item.color,
                        fontSize: item.fontSize,
                        fontFamily: item.fontFamily,
                      }}
                    >
                      {item.text}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
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
            <h3>Please verify all hadees text</h3>
            <div className="form-group">
              <label>User:</label>
              <input
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Chapter Number:</label>
              <input
                type="number"
                name="chapterNumber"
                value={formData.chapterNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Hadith Number:</label>
              <input
                type="number"
                name="hadithNumber"
                value={formData.hadithNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Book Name:</label>
              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Raavi:</label>
              <input
                type="text"
                name="raavi"
                value={formData.raavi}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Arabic Text:</label>
              <textarea
                name="arabicText"
                value={formData.arabicText}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Red Text:</label>
              <textarea
                name="redText"
                value={formData.redText}
                onChange={handleChange}
              />
            </div>
            <div>
              <h4>Mixed Text Preview</h4>
              <div className="mixed-text-preview">
                {formData.mixedText.map((item, index) => (
                  <span
                    key={index}
                    style={{
                      color: item.color,
                      fontSize: item.fontSize,
                      fontFamily: item.fontFamily,
                    }}
                  >
                    {item.text}
                    <br />
                  </span>
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
