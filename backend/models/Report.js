const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  fever: { type: String, required: true },
  cough: { type: String, required: true },
  breathingIssues: { type: String, required: true },
  weakness: { type: String, required: true },
  headache: { type: String, required: true },
  pain: { type: String, required: true },
  comments: { type: String },
  severity: { type: String, required: true },
  response: { type: String, default: null },  // ✅ Stores doctor's response
  reviewed: { type: Boolean, default: false },  // ✅ Tracks if doctor has reviewed the report
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", ReportSchema);
