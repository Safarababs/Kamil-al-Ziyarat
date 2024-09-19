import React, { useState } from "react";
import "./UpdateHadith.css"; // Import the CSS file

const UpdateHadith = () => {
  const [chapterNumber, setChapterNumber] = useState("");
  const [hadithNumber, setHadithNumber] = useState("");
  const [hadithData, setHadithData] = useState(null);
  const [updatedHadith, setUpdatedHadith] = useState({});
  const [message, setMessage] = useState("");

  const fetchHadith = async () => {
    try {
      const response = await fetch(
        `https://kamil-al-ziyarat-backend-1.onrender.com/api/get-hadiths?chapterNumber=${chapterNumber}&hadithNumber=${hadithNumber}`
      );
      const data = await response.json();
      if (data.length) {
        setHadithData(data[0]);
        setUpdatedHadith(data[0]); // Set initial values for editing
        setMessage(""); // Clear previous messages
      } else {
        setMessage("Hadith not found");
      }
    } catch (error) {
      setMessage("Error fetching Hadith");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://kamil-al-ziyarat-backend-1.onrender.com/api/update-hadith/${hadithData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedHadith),
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
            value={updatedHadith.raavi}
            onChange={(e) =>
              setUpdatedHadith({ ...updatedHadith, raavi: e.target.value })
            }
            placeholder="Raavi"
          />
          <input
            className="update-hadith-input book-name"
            type="text"
            value={updatedHadith.bookName}
            onChange={(e) =>
              setUpdatedHadith({ ...updatedHadith, bookName: e.target.value })
            }
            placeholder="Book Name"
          />
          <textarea
            className="update-hadith-textarea arabic-text"
            value={updatedHadith.arabicText}
            onChange={(e) =>
              setUpdatedHadith({ ...updatedHadith, arabicText: e.target.value })
            }
            placeholder="Arabic Text"
          />
          <input
            className="update-hadith-input black-text-one"
            type="text"
            value={updatedHadith.blackTextOne}
            onChange={(e) =>
              setUpdatedHadith({
                ...updatedHadith,
                blackTextOne: e.target.value,
              })
            }
            placeholder="Red Text"
          />
          <input
            className="update-hadith-input black-text-two"
            type="text"
            value={updatedHadith.blackTextTwo}
            onChange={(e) =>
              setUpdatedHadith({
                ...updatedHadith,
                blackTextTwo: e.target.value,
              })
            }
            placeholder="Black Text Two"
          />
          <textarea
            className="update-hadith-textarea english-text"
            value={updatedHadith.englishText}
            onChange={(e) =>
              setUpdatedHadith({
                ...updatedHadith,
                englishText: e.target.value,
              })
            }
            placeholder="English Text"
          />

          {message.includes("successfully") && (
            <p className="update-hadith-message">{message}</p>
          )}

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
