import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true); // Set loading to true before the fetch starts
      try {
        const response = await fetch(
          "https://kamil-al-ziyarat-backend-1.onrender.com/api/get-chapters"
        );
        console.log("Request sent");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data received:", data);
        setChapters(data);
      } catch (error) {
        console.error("Error fetching chapters1:", error);
        setError(
          `Error fetching chapters: ${error.message} check internet speed`
        );
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };

    fetchChapters();
  }, []);

  if (loading) {
    return <div className="home">Loading...</div>;
  }

  if (error) {
    return <div className="home">Error: {error}</div>;
  }

  return (
    <div className="home">
      <h2>Chapters</h2>
      <ul>
        {chapters.length > 0 ? (
          chapters.map((chapter) => (
            <li key={chapter.number}>
              <Link to={`/chapter/${chapter.number}`}>
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
