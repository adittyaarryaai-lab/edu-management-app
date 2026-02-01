const mongoose = require("mongoose");

/* -------- PERIOD SUB-SCHEMA -------- */
const periodSchema = new mongoose.Schema(
  {
    periodNumber: {
      type: Number,
      required: true
    },

    subject: {
      type: String,
      required: true
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true
    }
  },
  { _id: false }
);

/* -------- TIMETABLE SCHEMA -------- */
const timetableSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
      index: true
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
      index: true
    },

    day: {
      type: String,
      enum: [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY"
      ],
      required: true
    },

    periods: {
      type: [periodSchema],
      default: []
    }
  },
  { timestamps: true }
);

/* ❗ One timetable per class per day */
timetableSchema.index(
  { instituteId: 1, classId: 1, day: 1 },
  { unique: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);
