import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const token = Cookies.get("token");

  if (!token) {
    // Redirect to login if the token is missing
    return <Navigate to="/login" replace />;
  }



  // Render the component if conditions are met
  return <Outlet />;
};

export default PrivateRoute;
