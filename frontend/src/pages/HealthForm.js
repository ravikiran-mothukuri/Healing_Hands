import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/healthform.css";

const HealthForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    fever: "No",
    cough: "None",
    breathingIssues: "None",
    weakness: "Mild",
    headache: "No",
    pain: "No",
    comments: "",
  });
  

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post("http://localhost:5000/api/reports/submit", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage("✅ Report submitted successfully!");
      
      setTimeout(() => {
        navigate("/submitted-reports");
      }, 2000);

    } catch (err) {
      setMessage("❌ Error submitting report");
    }
  };
  
  
  return (

    <div className="health-form-page">
    <div className="health-form-container">
      <h2>🩺 Health Check Form</h2>
      
      {message && (
        <div className={`success-popup ${message.includes("✅") ? "success" : "error"}`}>
          {message}
        </div>
      )}

<form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        <label>Phone Number:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Do you have Fever?</label>
        <select name="fever" value={formData.fever} onChange={handleChange} required>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <label>Type of Cough:</label>
        <select name="cough" value={formData.cough} onChange={handleChange} required>
          <option value="None">None</option>
          <option value="Dry">Dry Cough</option>
          <option value="Wet">Wet Cough</option>
          <option value="Severe">Severe Cough</option>
        </select>

        <label>Breathing Issues?</label>
        <select name="breathingIssues" value={formData.breathingIssues} onChange={handleChange} required>
          <option value="None">None</option>
          <option value="Mild">Mild</option>
          <option value="Severe">Severe</option>
        </select>

        <label>Weakness Level:</label>
        <select name="weakness" value={formData.weakness} onChange={handleChange} required>
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
        </select>

        <label>Headache/Dizziness?</label>
        <select name="headache" value={formData.headache} onChange={handleChange} required>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <label>Any Pain (Chest/Stomach)?</label>
        <select name="pain" value={formData.pain} onChange={handleChange} required>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <label>Additional Comments:</label>
        <textarea name="comments" value={formData.comments} onChange={handleChange} rows="3" />

        <button type="submit">Submit</button>
      </form>

      
    </div>
  </div>
  );
};

export default HealthForm;
