import React, { useState } from "react";
// import "./UpdateHadithForm.css";

const UpdateHadithForm = ({ onClose, onUpdate }) => {
  const [chapterNumber, setChapterNumber] = useState("");
  const [hadithNumber, setHadithNumber] = useState("");
  const [hadiths, setHadiths] = useState([]);
  const [selectedHadith, setSelectedHadith] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHadiths = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://kamil-al-ziyarat.netlify.app/api/get-hadiths?chapterNumber=${chapterNumber}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch hadiths");
      }

      const hadithData = await response.json();
      const filteredHadiths = hadithData.filter(
        (h) => h.hadithNumber === Number(hadithNumber)
      );

      if (filteredHadiths.length > 0) {
        setHadiths(filteredHadiths);
        setSelectedHadith(null);
      } else {
        setHadiths([]);
        setError("Hadith not available");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHadith = (hadith) => {
    setSelectedHadith(hadith);
    setError("");
  };

  const handleUpdate = async (updatedData) => {
    if (!selectedHadith) return; // Check if a hadith is selected

    try {
      const response = await fetch(
        `https://kamil-al-ziyarat.netlify.app/api/update-hadith/${selectedHadith._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const updatedHadith = await response.json();
        onUpdate(updatedHadith); // This is now correctly defined
        onClose();
      } else {
        const errorData = await response.json();
        alert(
          "Failed to update hadith: " + (errorData.message || "Unknown error")
        );
      }
    } catch (error) {
      alert("Error updating hadith: " + error.message);
    }
  };

  return (
    <div className="updatecontainer">
      <h2>Search and Update Hadith</h2>
      <input
        className="input-field"
        type="number"
        placeholder="Chapter Number"
        value={chapterNumber}
        onChange={(e) => setChapterNumber(e.target.value)}
      />
      <input
        className="input-field"
        type="number"
        placeholder="Hadith Number"
        value={hadithNumber}
        onChange={(e) => setHadithNumber(e.target.value)}
      />
      <button onClick={fetchHadiths} disabled={loading}>
        {loading ? "Searching..." : "Search Hadith"}
      </button>

      {error && <p className="error">{error}</p>}
      {hadiths.length > 0 && (
        <ul>
          {hadiths.map((hadith) => (
            <li key={hadith._id} onClick={() => handleSelectHadith(hadith)}>
              Hadith No: {hadith.hadithNumber} - {hadith.content}
            </li>
          ))}
        </ul>
      )}

      {selectedHadith && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate(selectedHadith);
          }}
        >
          <h2>Update Hadith</h2>
          {/* Add labels and input fields as before */}
          <label>Chapter No:</label>
          <input
            type="number"
            value={selectedHadith.chapterNumber}
            onChange={(e) =>
              setSelectedHadith({
                ...selectedHadith,
                chapterNumber: e.target.value,
              })
            }
          />
          {/* Repeat for other fields */}
          <button type="submit">Update</button>
          <button type="button" onClick={() => setSelectedHadith(null)}>
            Cancel
          </button>
        </form>
      )}

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default UpdateHadithForm;
