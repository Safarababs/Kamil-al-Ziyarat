import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserManagement.css"; // Ensure you import the CSS

const UserManagementPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      <button
        className="add-hadith-button"
        onClick={() => navigate("/add-hadith")}
      >
        Add Hadith
      </button>
      <button
        className="update-hadith-button"
        onClick={() => navigate("/update-hadith")}
      >
        Update Hadith
      </button>
      <button
        className="delete-hadith-button"
        onClick={() => navigate("/delete-hadith")}
      >
        Delete Hadith
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserManagementPage;
