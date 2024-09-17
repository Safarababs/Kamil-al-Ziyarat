import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import ChapterDetail from "./Chapter Detail/ChapterDetail";
import SearchFunctionality from "./Search Functionality/SearchFunctionality";
import FavoritesComponent from "./Favorites Component/FavoritesComponent";

import AddHadithForm from "./Add Hadith/AddHadithForm";
import HadithDetail from "./Chapter Detail/HadithDetail";

const App = () => (
  <Router>
    <div>
      <Navbar />

      <main>
        <div className="main" style={{ marginTop: "25px", paddingTop: "4rem" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchFunctionality />} />
            <Route path="/chapter/:chapterNumber" element={<ChapterDetail />} />
            <Route
              path="/chapter/:chapterNumber/:hadithNumber"
              element={<HadithDetail />}
            />
            <Route path="/favorites" element={<FavoritesComponent />} />
            <Route path="/add" element={<AddHadithForm />} />
          </Routes>
        </div>
      </main>
    </div>
  </Router>
);

export default App;
