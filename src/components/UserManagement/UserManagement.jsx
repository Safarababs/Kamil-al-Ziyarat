import React from "react";
import { useNavigate } from "react-router-dom";

const UserManagementPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <h1>User Management</h1>
      <button onClick={() => navigate("/add-hadith")}>Add Hadith</button>
      <button onClick={() => navigate("/update-hadith")}>Update Hadith</button>
      <button onClick={() => navigate("/delete-hadith")}>Delete Hadith</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserManagementPage;
