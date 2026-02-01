const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    /* ---------- MULTI TENANT ---------- */
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
      index: true
    },

    /* ---------- ACADEMIC CONTEXT ---------- */
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
      index: true
    },

    subject: {
      type: String,
      required: true,
      trim: true
    },

    periodNumber: {
      type: Number,
      required: true,
      min: 1
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
      index: true
    },

    /* ---------- RELATIONS ---------- */
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    /* ---------- STATUS ---------- */
    status: {
      type: String,
      enum: ["PRESENT", "ABSENT"],
      required: true
    }
  },
  { timestamps: true }
);

/* 🔒 CORE LOGIC — NO DUPLICATE ATTENDANCE */
attendanceSchema.index(
  {
    studentId: 1,
    date: 1,
    periodNumber: 1
  },
  { unique: true }
);

/* 🚀 FAST QUERY INDEX (CLASS + DATE) */
attendanceSchema.index({
  classId: 1,
  date: 1
});

module.exports = mongoose.model("Attendance", attendanceSchema);
