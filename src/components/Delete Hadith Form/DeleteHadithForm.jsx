import React, { useState } from "react";

const DeleteHadithForm = ({ onClose, onDelete }) => {
  const [chapterNumber, setChapterNumber] = useState("");
  const [hadithNumber, setHadithNumber] = useState("");
  const [hadith, setHadith] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHadith = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/get-hadiths?chapterNumber=${chapterNumber}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch hadiths");
      }

      const hadiths = await response.json();
      const foundHadith = hadiths.find(
        (h) => h.hadithNumber === Number(hadithNumber)
      );

      if (foundHadith) {
        setHadith(foundHadith);
      } else {
        setHadith(null); // Reset hadith when not found
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
        `http://localhost:5000/api/delete-hadith/${hadith._id}`,
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
      <h2>Delete Hadith</h2>

      <div>
        <input
          type="number"
          placeholder="Chapter Number"
          value={chapterNumber}
          onChange={(e) => setChapterNumber(e.target.value)}
        />
        <input
          type="number"
          placeholder="Hadith Number"
          value={hadithNumber}
          onChange={(e) => setHadithNumber(e.target.value)}
        />
        <button onClick={fetchHadith} disabled={loading}>
          {loading ? "Searching..." : "Search Hadith"}
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {hadith ? (
        <>
          <p>Are you sure you want to delete this Hadith?</p>
          <p>Hadith No: {hadith.hadithNumber}</p>
          <p>Content: {hadith.content}</p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Confirm Delete"}
          </button>
        </>
      ) : (
        error === "Hadith not found" && <p>Search Again</p>
      )}

      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DeleteHadithForm;
