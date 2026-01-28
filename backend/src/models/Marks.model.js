const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },

    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    marksObtained: {
      type: Number,
      required: true,
    },

    maxMarks: {
      type: Number,
      required: true,
    },

    enteredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // teacher
    },
  },
  { timestamps: true }
);

// ❗ Prevent duplicate marks per subject
marksSchema.index(
  { examId: 1, studentId: 1, subject: 1 },
  { unique: true }
);

module.exports = mongoose.model("Marks", marksSchema);
