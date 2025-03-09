const Report = require("../models/Report");

const submitReport = async (req, res) => {
    try {
        const { age, gender, symptoms, temperature, motions, urine_color } = req.body;

        if (!age || !gender || !symptoms) {
            return res.status(400).json({ message: "Age, gender, and symptoms are required" });
        }

        const report = new Report({
            user: req.user.id,  // User ID from JWT Token
            age,
            gender,
            symptoms,
            temperature,
            motions,
            urine_color,
        });

        await report.save();
        res.status(201).json({ message: "Report submitted successfully", report });
    } catch (error) {
        console.error("Error submitting report:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getUserReports = async (req, res) => {
    try {
        const reports = await Report.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { submitReport, getUserReports };
