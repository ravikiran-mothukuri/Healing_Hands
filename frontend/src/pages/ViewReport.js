import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/viewReport.css";

const ViewReport = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
  
      try {
        const res = await axios.get(`http://localhost:5000/api/reports/${reportId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("📩 Received Report Data:", res.data);  // ✅ Debugging log
        setReport(res.data);
      } catch (err) {
        console.error("❌ Error fetching report:", err);
      }
    };
  
    fetchReport();
  }, [navigate, reportId]);
  

  const handleRespond = async () => {
    if (!response) return alert("Please enter a response.");
  
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `http://localhost:5000/api/reports/respond/${reportId}`,
        { response },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
  
      console.log("✅ Response sent! Updated Report:", res.data);  // ✅ Debugging log
  
      // ✅ Fetch the updated report data to ensure reviewed status is true
      const updatedReport = await axios.get(`http://localhost:5000/api/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("📩 Received Updated Report:", updatedReport.data);  // ✅ Debugging log
      setReport(updatedReport.data);  // ✅ Update UI with the latest status
  
      navigate("/patient-reports"); 
  
    } catch (err) {
      console.error("❌ Error responding:", err);
    }
  };
  
  

  return (
    <div className="view-report-container">
      {report ? (
        <>
          <h2>📋 Patient Report</h2>
          <p><strong>Name:</strong> {report.name}</p>
          <p><strong>Age:</strong> {report.age}</p>
          <p><strong>Phone:</strong> {report.phone}</p>
          <p><strong>Severity:</strong> {report.severity}</p>
          <p><strong>Status:</strong> {report.reviewed ? "Reviewed ✅" : "New 🟢"}</p>
          <p><strong>Symptoms:</strong> {report.fever}, {report.cough}, {report.breathingIssues}</p>
          <p><strong>Weakness:</strong> {report.weakness}</p>
          <p><strong>Comments:</strong> {report.comments || "None"}</p>
          <p><strong>Doctor's Response:</strong> {report.response ? report.response : "No response yet"}</p>

          {report.response ? (
            <p>✅ Response already submitted.</p>
          ) : (
            <div className="response-form">
              <textarea
                placeholder="Enter response..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
              <button onClick={handleRespond}>Submit Response</button>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewReport;
