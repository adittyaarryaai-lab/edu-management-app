const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },

    name: {
      type: String,
      required: true, // 1, 2, 10, 12
      trim: true,
    },

    section: {
      type: String, // A, B, C
      trim: true,
    },

    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate class in same institute
classSchema.index(
  { instituteId: 1, name: 1, section: 1 },
  { unique: true }
);

module.exports = mongoose.model("Class", classSchema);
