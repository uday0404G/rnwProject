import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const HomeDeshbord = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from cookies
    Cookies.remove("token");

    // Redirect to the login page
    navigate("/login");

    // Optional: Show a logout confirmation
    alert("You have been logged out.");
  };

  return (
    <div>
      <h1>Teacher Home</h1>
      <button onClick={handleLogout} style={logoutButtonStyle}>
        Logout
      </button>
    </div>
  );
};



export default HomeDeshbord;
