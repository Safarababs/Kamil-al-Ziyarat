import React, { useState } from "react";
import "./DeleteHadithForm.css";

const DeleteHadithForm = ({ onClose, onDelete }) => {
  const [chapterNumber, setChapterNumber] = useState("");
  const [hadithNumber, setHadithNumber] = useState("");
  const [hadith, setHadith] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [confirmDelete, setConfirmDelete] = useState(false); // State for confirming deletion

  const fetchHadith = async () => {
    setLoading(true);
    setError("");
    setDeleteMessage("");
    setSuccessMessage("");
    setConfirmDelete(false); // Reset confirmation state

    try {
      const response = await fetch(
        `https://kamil-al-ziyarat-backend-1.onrender.com/api/get-hadith/${chapterNumber}/${hadithNumber}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch hadith");
      }

      const foundHadith = await response.json();

      if (foundHadith) {
        setHadith(foundHadith);
        setDeleteMessage(
          `Chapter ${foundHadith.chapterNumber} & Hadees ${foundHadith.hadithNumber} found.`
        );
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
        `https://kamil-al-ziyarat-backend-1.onrender.com/api/delete-hadith/${hadith._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete Hadith");
      }

      // Clear messages after deletion
      setDeleteMessage(""); // Clear delete message
      setSuccessMessage(`Hadith deleted successfully.`); // Set success message
      onDelete(hadith._id);
      setHadith(null); // Reset hadith after deletion
      setConfirmDelete(false); // Reset confirmation state
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
      {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      {successMessage && (
        <p className="success-message" style={{ color: "green" }}>
          {successMessage}
        </p>
      )}

      {hadith && !confirmDelete ? (
        <>
          <p style={{ color: "red" }}>
            Are you sure you want to delete this Hadith?
          </p>
          <button
            className="delete-hadith-button"
            onClick={() => setConfirmDelete(true)} // Confirm deletion
            disabled={loading}
          >
            Confirm Delete
          </button>
        </>
      ) : confirmDelete ? (
        <>
          <p
            style={{
              color: "red",
              textAlign: "center",
              fontSize: "1.2rem",
              marginTop: "1rem",
            }}
          >
            Please Confirm Delete
          </p>
          <button
            className="delete-hadith-button"
            onClick={handleDelete}
            style={{ backgroundColor: "red", color: "white" }} // Red background with white text
            disabled={loading}
          >
            {loading ? "Deleting..." : "Click To Delete Now"}
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
