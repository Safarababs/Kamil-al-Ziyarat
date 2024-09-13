import React from "react";
import { Link } from "react-router-dom";
import { chapterNames } from "../Chapters/data";
import "./Home.css"; // Import the CSS specific to this component

const Home = () => (
  <div className="home">
    <h2>Chapters</h2>
    <ul>
      {chapterNames.map((chapter, index) => (
        <li key={index}>
          <Link to={`/chapter/${encodeURIComponent(chapter)}`}>{chapter}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Home;
