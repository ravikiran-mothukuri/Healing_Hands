import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/doctor.css";

const DoctorDashboard = () => {
  const [doctorName, setDoctorName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Doctor Profile Response:", res.data); // ✅ Debugging Log
        setDoctorName(res.data.name);  // ✅ Ensure correct field name

      } catch (err) {
        console.error("Error fetching doctor data:", err);
      }
    };

    fetchDoctorData();
  }, [navigate]);

  // ✅ Function to get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Add page-container class to main div
return (
  <div className="page-container doctor-dashboard">
    <div className="container"> {/* Add container div */}
      <h1>👨‍⚕️ {getGreeting()}, Dr. {doctorName || "Loading..."}</h1>
      <p>Go to "Patient Reports" to check and respond to patient cases.</p>
    </div>
  </div>
);
  
};

export default DoctorDashboard;
