const mongoose = require("mongoose");

const parentStudentSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// 🚫 Prevent duplicate linking
parentStudentSchema.index(
  { parentId: 1, studentId: 1 },
  { unique: true }
);

module.exports = mongoose.model("ParentStudent", parentStudentSchema);
