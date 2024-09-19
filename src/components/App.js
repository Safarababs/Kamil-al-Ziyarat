import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import ChapterDetail from "./Chapter Detail/ChapterDetail";
import HadithDetail from "./Chapter Detail/HadithDetail";
import UserManagementPage from "./UserManagement/UserManagement";
import AddHadithPage from "./UserManagement/AddHadithPage";
import UpdateHadithPage from "./UserManagement/UpdateHadithPage";
import DeleteHadithPage from "./UserManagement/DeleteHadithPage";
import LoginPage from "./UserManagement/LoginPage";

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
            <Route
              path="/hadith/:chapterNumber/:hadithNumber"
              element={<HadithDetail />}
            />
            <Route path="/user" element={<LoginPage />} />
            <Route path="/user-management" element={<UserManagementPage />} />
            <Route path="/add-hadith" element={<AddHadithPage />} />
            <Route path="/update-hadith" element={<UpdateHadithPage />} />
            <Route path="/delete-hadith" element={<DeleteHadithPage />} />
          </Routes>
        </div>
      </main>
    </div>
  </Router>
);

export default App;
