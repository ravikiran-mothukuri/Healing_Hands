import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "patient" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", formData);
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="form-header">
          <h2>📝 Register for Healing Hands</h2>
          <p>Create your free account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="role-selection">
            <label>Account Type</label>
            <div className="role-options">
              <button
                type="button"
                className={`role-btn ${formData.role === "patient" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, role: "patient" })}
              >
                Patient
              </button>
              <button
                type="button"
                className={`role-btn ${formData.role === "doctor" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, role: "doctor" })}
              >
                Doctor
              </button>
            </div>
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default Register;