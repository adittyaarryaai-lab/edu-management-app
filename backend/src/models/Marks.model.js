const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
      index: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
      index: true,
    },

    // 👇 subject-wise marks in one document
    subjectMarks: [
      {
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
      },
    ],

    enteredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // teacher
    },
  },
  { timestamps: true }
);

/**
 * ❗ One student can have only ONE marks record per exam
 * Subjects are handled inside subjectMarks array
 */
marksSchema.index(
  { instituteId: 1, studentId: 1, examId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Marks", marksSchema);
