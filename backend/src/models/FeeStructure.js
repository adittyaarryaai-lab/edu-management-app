const mongoose = require("mongoose");

const feeStructureSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
      index: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
      index: true,
    },

    academicYear: {
      type: String,
      required: true, // e.g. 2025-26
    },

    // Fee breakup (Tuition, Lab, Transport, etc.)
    fees: [
      {
        title: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],

    // Optional installments (future-ready)
    installments: [
      {
        name: String, // Installment 1, Term 1, etc.
        amount: Number,
        dueDate: Date,
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// 🚫 Prevent duplicate fee structure per class per year per institute
feeStructureSchema.index(
  { instituteId: 1, classId: 1, academicYear: 1 },
  { unique: true }
);

module.exports = mongoose.model("FeeStructure", feeStructureSchema);
