import React, { useState } from "react";
import "./AddHadithForm.css";

const AddHadithForm = () => {
  const [formData, setFormData] = useState({
    chapterNumber: "",
    hadithNumber: "",
    user: "",
    bookName: "",
    raavi: "",
    arabicText: "",
    blackTextOne: "",
    blackTextTwo: "",
    englishText: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      chapterNumber,
      hadithNumber,
      user,
      bookName,
      raavi,
      arabicText,
      blackTextOne,
      blackTextTwo,
      englishText,
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chapterNumber: chapterNum,
            hadithNumber,
            user,
            bookName,
            raavi,
            arabicText,
            blackTextOne,
            blackTextTwo,
            englishText,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to add Hadith:", errorData);
        setError(errorData.message || "Failed to add Hadith");
        return;
      }

      const result = await response.json();
      console.log("Hadith added:", result);
      setFormData({
        chapterNumber: "",
        hadithNumber: "",
        user: "",
        bookName: "",
        raavi: "",
        arabicText: "",
        blackTextOne: "",
        blackTextTwo: "",
        englishText: "",
      });
      setError(null);
    } catch (error) {
      console.error("Error submitting form:", error);
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
              name="blackTextTwo"
              value={formData.blackTextTwo}
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
            className="right-align arabic-text"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            name="raavi"
            value={formData.raavi}
            onChange={handleChange}
            placeholder="Red Text"
            className="right-align"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="blackTextOne"
            value={formData.blackTextOne}
            onChange={handleChange}
            placeholder="Black Text"
            className="right-align"
            required
          />
        </div>

        <div className="form-group">
          <textarea
            name="englishText"
            value={formData.englishText}
            onChange={handleChange}
            placeholder="English Text"
            className="arabic-text"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : "Add Hadith"}
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
