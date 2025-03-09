const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const Report = require("../models/Report");

router.post("/submit", authMiddleware, async (req, res) => {
  try {
    console.log("Received Data:", req.body); // ✅ Debugging: Check received data

    const { name, age, phone, fever, cough, breathingIssues, weakness, headache, pain, comments } = req.body;

    if (!name || !age || !phone) {
      return res.status(400).json({ message: "Missing required fields: name, age, or phone." });
    }

    let severity = "Minor";

    if (
      (fever === "Yes" && breathingIssues === "Severe") ||
      weakness === "Severe" || 
      (headache === "Yes" && pain === "Yes")
    ) {
      severity = "Critical";
    }

    const newReport = new Report({
      user: req.user.id,
      name,
      age,
      phone,
      fever,
      cough,
      breathingIssues,
      weakness,
      headache,
      pain,
      comments,
      severity,
    });

    await newReport.save();
    res.json({ message: `Health report submitted successfully! Severity: ${severity}` });

  } catch (error) {
    console.error("❌ Error in report submission:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.get("/my-reports", authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select("name age phone severity response reviewed createdAt"); // ✅ Include reviewed field
    res.json(reports);
  } catch (error) {
    console.error("❌ Error fetching reports:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/all-reports", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied. Only doctors can view reports." });
    }

    const reports = await Report.find()
      .populate("user", "name age phone")
      .sort({ createdAt: -1 })
      .select("name age phone severity response reviewed createdAt"); // ✅ Include reviewed field

    res.json(reports);
  } catch (error) {
    console.error("❌ Error fetching all reports:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.post("/respond/:reportId", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied. Only doctors can respond." });
    }

    const { response } = req.body;
    if (!response) {
      return res.status(400).json({ message: "Response is required." });
    }

    // ✅ Ensure MongoDB updates the report with `reviewed: true`
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.reportId,
      { response, reviewed: true },  // ✅ Force update fields
      { new: true } // ✅ Returns updated document
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found." });
    }

    console.log("✅ Updated Report:", updatedReport); // ✅ Debugging log

    res.json({ message: "Response sent successfully!", report: updatedReport });

  } catch (error) {
    console.error("❌ Error responding:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



router.get("/:reportId", authMiddleware, async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found." });
    }
    res.json(report);
  } catch (error) {
    console.error("❌ Error fetching report:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;
