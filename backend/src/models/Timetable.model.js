const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
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

    periodNumber: {
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
  { instituteId: 1, classId: 1, day: 1, periodNumber: 1 },
  { unique: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);
