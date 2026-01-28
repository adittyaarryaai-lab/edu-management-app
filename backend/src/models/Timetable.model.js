const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
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

    day: {
      type: String,
      enum: [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ],
      required: true,
    },

    period: {
      type: Number,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  { timestamps: true }
);

// ❗ Prevent duplicate timetable slots
timetableSchema.index(
  { instituteId: 1, className: 1, section: 1, day: 1, period: 1 },
  { unique: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);
