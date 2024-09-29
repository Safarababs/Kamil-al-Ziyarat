import React, { useEffect, useState } from "react";
import "./SearchHadiths.css";

const SearchHadiths = () => {
  const [hadiths, setHadiths] = useState([]);
  const [chapterNumber, setChapterNumber] = useState("");
  const [hadithNumber, setHadithNumber] = useState("");
  const [filteredHadith, setFilteredHadith] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHadiths = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://kamil-al-ziyarat-backend-1.onrender.com/api/get-all-hadiths"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Hadiths");
        }

        const data = await response.json();
        setHadiths(data);
      } catch (error) {
        setError("Error fetching Hadiths");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHadiths();
  }, []);

  const handleSearch = () => {
    const chapterNum = parseInt(chapterNumber, 10);
    const hadithNum = hadithNumber; // Keep hadithNum as a string

    if (isNaN(chapterNum) || hadithNum === "") {
      setError("Please enter valid numbers for chapter and hadith.");
      return;
    }

    console.log("Searching for Chapter:", chapterNum, "Hadith:", hadithNum);

    const foundHadith = hadiths.find((h) => {
      return (
        h.chapterNumber === chapterNum && String(h.hadithNumber) === hadithNum
      );
    });

    if (foundHadith) {
      setFilteredHadith(foundHadith);
      setError("");
      console.log("Found Hadith:", foundHadith);
    } else {
      setError("Hadith not found");
      setFilteredHadith(null);
    }
  };

  const handleClear = () => {
    setChapterNumber("");
    setHadithNumber("");
    setFilteredHadith(null);
    setError("");
  };

  return (
    <div className="search-hadiths-container">
      <h2>Search Hadiths</h2>
      <input
        type="number"
        placeholder="Enter Chapter Number"
        value={chapterNumber}
        onChange={(e) => setChapterNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Hadith Number"
        value={hadithNumber}
        onChange={(e) => setHadithNumber(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {filteredHadith && (
        <div className="found-hadith">
          <p style={{ textAlign: "center" }}>
            {filteredHadith.chapterNumber}/{filteredHadith.hadithNumber}
          </p>
          <p className="arabic-text">{filteredHadith.arabicText}</p>
          <p className="raavi">{filteredHadith.raavi}</p>

          {/* Rendering mixedText */}
          {filteredHadith.mixedText.map((item) => (
            <p
              key={item._id}
              className={
                item.color === "red"
                  ? "raavi"
                  : item.color === "blue"
                  ? "arabic-text"
                  : "urdu-text"
              }
            >
              {item.text}
            </p>
          ))}

          <p>Contributed by: {filteredHadith.user}</p>
          <p className="book-name">{filteredHadith.bookName}</p>
        </div>
      )}
    </div>
  );
};

export default SearchHadiths;
