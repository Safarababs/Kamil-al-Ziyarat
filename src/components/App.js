import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import ChapterDetail from "./Chapter Detail/ChapterDetail";
import SearchFunctionality from "./Search Functionality/SearchFunctionality";
import FavoritesComponent from "./Favorites Component/FavoritesComponent";
import Jump from "./JumpModal/Jump";

const App = () => (
  <Router>
    <div>
      <Navbar />
      <main>
        <Jump /> {/* Add Jump component here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchFunctionality />} />
          <Route path="/chapter/:chapterName" element={<ChapterDetail />} />
          <Route
            path="/chapter/:chapterName/:hadithNumber"
            element={<ChapterDetail />}
          />
          <Route path="/favorites" element={<FavoritesComponent />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
