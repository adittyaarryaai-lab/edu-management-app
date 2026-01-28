const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },

    className: {
      type: String,
      required: true,
    },

    section: {
      type: String,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    records: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        status: {
          type: String,
          enum: ["PRESENT", "ABSENT"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// ❗ Prevent duplicate attendance
attendanceSchema.index(
  { instituteId: 1, className: 1, section: 1, date: 1 },
  { unique: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
