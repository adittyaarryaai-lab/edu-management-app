const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    periodNumber: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PRESENT", "ABSENT"],
      required: true,
    },
  },
  { timestamps: true }
);

// 🔒 Duplicate prevention (CORE LOGIC)
attendanceSchema.index(
  {
    studentId: 1,
    date: 1,
    periodNumber: 1,
  },
  { unique: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
