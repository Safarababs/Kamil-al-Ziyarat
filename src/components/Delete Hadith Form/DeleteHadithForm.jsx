import React, { useState } from "react";

const DeleteHadithForm = ({ onClose, onDelete }) => {
  const [chapterNumber, setChapterNumber] = useState("");
  const [hadithNumber, setHadithNumber] = useState("");
  const [hadith, setHadith] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteMessage, setDeleteMessage] = useState(""); // New state for delete message

  const fetchHadith = async () => {
    setLoading(true);
    setError("");
    setDeleteMessage(""); // Reset delete message

    try {
      const response = await fetch(
        `https://kamil-al-ziyarat-backend-1.onrender.com/api/get-hadith/${chapterNumber}/${hadithNumber}` // Updated URL
      );

      if (!response.ok) {
        throw new Error("Failed to fetch hadith");
      }

      const foundHadith = await response.json();

      if (foundHadith) {
        setHadith(foundHadith);
        setDeleteMessage(`Hadith with ID ${foundHadith._id} found.`); // Set delete message
      } else {
        setHadith(null);
        setError("Hadith not found");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!hadith) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://kamil-al-ziyarat-backend-1.onrender.com/api/delete-hadith/${hadith._id}`, // Updated URL
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete Hadith");
      }

      onDelete(hadith._id);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-hadith-form">
      <h2 className="delete-hadith-title">Delete Hadith</h2>
      <div className="input-container">
        <input
          className="delete-hadith-input"
          type="number"
          placeholder="Chapter Number"
          value={chapterNumber}
          onChange={(e) => setChapterNumber(e.target.value)}
        />
        <input
          className="delete-hadith-input"
          type="number"
          placeholder="Hadith Number"
          value={hadithNumber}
          onChange={(e) => setHadithNumber(e.target.value)}
        />
        <button
          className="delete-hadith-button"
          onClick={fetchHadith}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Hadith"}
        </button>
      </div>
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {deleteMessage && <p className="delete-message">{deleteMessage}</p>}{" "}
      {/* Display delete message */}
      {hadith ? (
        <>
          <p>Are you sure you want to delete this Hadith?</p>
          <p>Hadith No: {hadith.hadithNumber}</p>
          <p>Content: {hadith.content}</p>
          <button
            className="delete-hadith-button"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Confirm Delete"}
          </button>
        </>
      ) : (
        error === "Hadith not found" && <p>Search Again</p>
      )}
      <button className="cancel-button" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteHadithForm;
