const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },

    name: {
      type: String,
      required: true, // Mid Term, Final Exam
    },

    className: {
      type: String,
      required: true, // "10"
    },

    section: {
      type: String, // "A"
    },

    academicYear: {
      type: String,
      required: true, // 2025-26
    },

    startDate: Date,
    endDate: Date,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);
