import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [chapters, setChapters] = useState([]);
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch chapters
        const chapterResponse = await fetch(
          "https://kamil-al-ziyarat-backend-1.onrender.com/api/get-chapters" // Updated URL
        );
        if (!chapterResponse.ok) {
          throw new Error(`HTTP error! Status: ${chapterResponse.status}`);
        }
        const chapterData = await chapterResponse.json();

        // Fetch all hadiths
        const hadithResponse = await fetch(
          "https://kamil-al-ziyarat-backend-1.onrender.com/api/get-all-hadiths" // Updated URL
        );
        if (!hadithResponse.ok) {
          throw new Error(`HTTP error! Status: ${hadithResponse.status}`);
        }
        const hadithData = await hadithResponse.json();

        setChapters(chapterData);
        setHadiths(hadithData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="home">Loading...</div>;
  }

  if (error) {
    return <div className="home">Error: {error}</div>;
  }

  const handleChapterClick = (chapterNumber) => {
    // This function can be used to navigate to a chapter detail page if needed
    // For now, we can filter hadiths here if needed
    const filteredHadiths = hadiths.filter(
      (hadith) => hadith.chapterNumber === chapterNumber
    );
    console.log(filteredHadiths); // Debugging: see the filtered hadiths
  };

  return (
    <div className="home">
      <h2>Chapters</h2>
      <ul>
        {chapters.length > 0 ? (
          chapters.map((chapter) => (
            <li key={chapter.number}>
              <Link
                to={`/chapter/${chapter.number}`}
                onClick={() => handleChapterClick(chapter.number)}
              >
                {chapter.number}. {chapter.name}
              </Link>
            </li>
          ))
        ) : (
          <li>No chapters available</li>
        )}
      </ul>
    </div>
  );
};

export default Home;
