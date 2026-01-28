const mongoose = require("mongoose");

const feeStructureSchema = new mongoose.Schema(
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

    academicYear: {
      type: String,
      required: true, // 2025-26
    },

    fees: [
      {
        title: String, // Tuition, Lab, Transport
        amount: Number,
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// 🚫 Prevent duplicate fee structure
feeStructureSchema.index(
  { instituteId: 1, classId: 1, academicYear: 1 },
  { unique: true }
);

module.exports = mongoose.model("FeeStructure", feeStructureSchema);
