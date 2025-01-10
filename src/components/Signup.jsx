import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserSignup } from "../Redux/Auth/Action";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", 
    secretKey: "", 
  });

  const store = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.role === "teacher" && !formData.secretKey) {
      toast.error("Please enter the secret key for teachers.");
      return;
    }

    dispatch(UserSignup(formData));

      
    
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <ToastContainer />
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
              id="password"
              placeholder="Create a password"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role:</label>
            <div className="form-check">
              <input
                type="radio"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleChange}
                className="form-check-input"
                id="student"
              />
              <label htmlFor="student" className="form-check-label">
                Student
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={formData.role === "teacher"}
                onChange={handleChange}
                className="form-check-input"
                id="teacher"
              />
              <label htmlFor="teacher" className="form-check-label">
                Teacher
              </label>
            </div>
          </div>
          {formData.role === "teacher" && (
            <div className="mb-3">
              <label htmlFor="secretKey" className="form-label">
                Secret Key:
              </label>
              <input
                type="text"
                name="secretKey"
                value={formData.secretKey}
                onChange={handleChange}
                required
                className="form-control"
                id="secretKey"
                placeholder="Enter the secret key"
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Signup
          </button>
        </form>
        <p className="text-center text-muted mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-primary">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
