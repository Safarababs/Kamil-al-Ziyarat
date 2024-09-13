// src/components/SearchComponent.js

import React, { useState } from "react";
import { chapters } from "../Chapters/data";
import "./SearchComponent.css";

const allHadiths = Object.values(chapters).flat();

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.trim();
    setQuery(searchQuery);

    if (searchQuery) {
      // Normalize Urdu text for accurate searching
      const normalizedQuery = searchQuery.normalize("NFKC");

      // Filter Hadiths to include those that contain the exact search query
      const filteredHadiths = allHadiths.filter((item) => {
        const normalizedText = item.text.normalize("NFKC");
        // Check if the text contains the query as a substring
        return normalizedText.includes(normalizedQuery);
      });

      setResults(filteredHadiths);
    } else {
      // If the query is empty, clear results
      setResults([]);
    }
  };

  const highlightText = (text) => {
    if (!query) return text;

    const normalizedText = text.normalize("NFKC");
    const normalizedQuery = query.normalize("NFKC");
    const highlightedText = normalizedText.replace(
      new RegExp(`(${normalizedQuery})`, "gi"),
      (match) => `<mark>${match}</mark>`
    );

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={handleSearch}
        placeholder="Search hadith..."
      />
      <div className="results-container">
        {results.length > 0 ? (
          results.map((result) => (
            <div className="hadith-card" key={result.id}>
              <div className="hadith-header">
                Hadith {result.number} (Chapter {result.chapter})
              </div>
              <div className="hadith-content">{highlightText(result.text)}</div>
            </div>
          ))
        ) : (
          <div className="no-results">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
