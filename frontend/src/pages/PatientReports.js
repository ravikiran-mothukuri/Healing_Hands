import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/patientReports.css";

const PatientReports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/reports/all-reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, [navigate]);

  return (
    <div className="patient-reports-container">
      <h1>📋 Patient Reports</h1>
      {reports.length === 0 ? (
        <p>No patient reports found.</p>
      ) : (
        reports.map((report, index) => (
          <div
            key={index}
            className={`report-box ${report.reviewed ? "reviewed-report" : "new-report"}`}
          >
            <h3>Patient: {report.name}</h3>
            <p><strong>Age:</strong> {report.age}</p>
            <p><strong>Phone:</strong> {report.phone}</p>
            <p><strong>Severity:</strong> {report.severity}</p>
            <p><strong>Status:</strong> {report.reviewed ? "Reviewed ✅" : "New 🟢"}</p>
            <button onClick={() => navigate(`/patient-report/${report._id}`)}>🔍 View Details</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientReports;
