const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
      index: true,
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

    /* 🔥 NEW — Exam subjects (VERY IMPORTANT FOR MARKS) */
    subjects: [
      {
        name: {
          type: String,
          required: true, // Math, Science
        },
        maxMarks: {
          type: Number,
          required: true, // 100
        },
      },
    ],

    startDate: Date,
    endDate: Date,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

/* 🔐 One exam per class + section + year */
examSchema.index({
  instituteId: 1,
  className: 1,
  section: 1,
  name: 1,
  academicYear: 1,
});

module.exports = mongoose.model("Exam", examSchema);
