import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [chapters, setChapters] = useState([]);
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch chapters
        const chapterResponse = await fetch(
          "https://kamil-al-ziyarat-backend-1.onrender.com/api/get-chapters"
        );
        if (!chapterResponse.ok) {
          throw new Error(`HTTP error! Status: ${chapterResponse.status}`);
        }
        const chapterData = await chapterResponse.json();
        setChapters(chapterData);

        // Check local storage for hadiths
        const cachedHadiths = localStorage.getItem("hadiths");
        if (cachedHadiths) {
          setHadiths(JSON.parse(cachedHadiths));
        } else {
          // Fetch all hadiths if not in local storage
          const hadithResponse = await fetch(
            "https://kamil-al-ziyarat-backend-1.onrender.com/api/get-all-hadiths"
          );
          if (!hadithResponse.ok) {
            throw new Error(`HTTP error! Status: ${hadithResponse.status}`);
          }
          const hadithData = await hadithResponse.json();
          setHadiths(hadithData);
          localStorage.setItem("hadiths", JSON.stringify(hadithData)); // Cache hadiths
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Dot animation effect
    const dotInterval = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4);
    }, 100); // Change dot count every 100ms

    return () => clearInterval(dotInterval); // Cleanup interval on component unmount
  }, []);

  if (loading) {
    return (
      <div className="home" style={{ direction: "ltr" }}>
        Loading{"...".repeat(dotCount)} {/* Add dots based on the dotCount */}
      </div>
    );
  }

  if (error) {
    return <div className="home">Error: {error}</div>;
  }

  const handleChapterClick = (chapterNumber) => {
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
