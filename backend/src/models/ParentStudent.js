const mongoose = require("mongoose");

const parentStudentSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
      index: true
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
  },
  { timestamps: true }
);

/**
 * 🚫 Prevent duplicate linking
 * Same parent cannot be linked to same student
 * within the same institute
 */
parentStudentSchema.index(
  {
    instituteId: 1,
    parentId: 1,
    studentId: 1
  },
  { unique: true }
);

module.exports = mongoose.model("ParentStudent", parentStudentSchema);
