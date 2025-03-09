import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/submittedReports.css";

const SubmittedReports = () => {
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
        const res = await axios.get("http://localhost:5000/api/reports/my-reports", {
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
    <div className="submitted-reports-container">
      <h1>📋 Submitted Reports</h1>
      {reports.length === 0 ? (
        <p>No reports found. Please submit a health check form.</p>
      ) : (
        reports.map((report, index) => (
          <div key={index} className="report-box">
            <div className="report-header">
              <h3>📝 Medical Report - {report.name}</h3>
              <div className="patient-basic-info">
                <p><strong>Age:</strong> {report.age}</p>
                <p><strong>Phone:</strong> {report.phone}</p>
              </div>
            </div>

            <div className="symptoms-section">
              <p><strong>Reported Symptoms:</strong></p>
              <ul className="symptoms-list">
                <li>Fever: {report.fever}</li>
                <li>Cough: {report.cough}</li>
                <li>Breathing Issues: {report.breathingIssues}</li>
                <li>Weakness: {report.weakness}</li>
                <li>Headache: {report.headache}</li>
                <li>Pain: {report.pain}</li>
              </ul>
            </div>

            {report.comments && (
              <div className="patient-comments">
                <p><strong>Comments:</strong> {report.comments}</p>
              </div>
            )}

            <div className="doctor-response">
              <p><strong>Doctor's Assessment:</strong></p>
              <div className="response-content">
                {report.response || "Awaiting professional review..."}
              </div>
              {report.severity && (
                <p className="severity-badge">
                  Severity: {report.severity}
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SubmittedReports;