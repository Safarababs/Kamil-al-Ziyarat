import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import ChapterDetail from "./Chapter Detail/ChapterDetail";
import UserManagementPage from "./UserManagement/UserManagement";
import AddHadithPage from "./UserManagement/AddHadithPage";
import UpdateHadithPage from "./UserManagement/UpdateHadithPage";
import DeleteHadithPage from "./UserManagement/DeleteHadithPage";
import LoginPage from "./UserManagement/LoginPage";
import SearchHadiths from "./Search Funtionality/SearchHadiths";
import Settings from "./Settings/Settings";

const App = () => (
  <Router>
    <div>
      <Navbar />
      <main>
        <div
          className="main"
          style={{ marginTop: "50px", paddingTop: "4.5rem" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapter/:chapterNumber" element={<ChapterDetail />} />

            <Route path="/user" element={<LoginPage />} />
            <Route path="/user-management" element={<UserManagementPage />} />
            <Route path="/add-hadith" element={<AddHadithPage />} />
            <Route path="/update-hadith" element={<UpdateHadithPage />} />
            <Route path="/delete-hadith" element={<DeleteHadithPage />} />
            <Route path="/safar" element={<SearchHadiths />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  </Router>
);

export default App;
