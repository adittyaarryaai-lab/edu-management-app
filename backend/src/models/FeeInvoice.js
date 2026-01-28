const mongoose = require("mongoose");

const feeInvoiceSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    academicYear: {
      type: String,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["PAID", "PARTIAL", "DUE"],
      default: "DUE",
    },

    payments: [
      {
        amount: Number,
        date: Date,
        mode: String, // cash / online
        reference: String,
      },
    ],
  },
  { timestamps: true }
);

// 🚫 One invoice per student per year
feeInvoiceSchema.index(
  { studentId: 1, academicYear: 1 },
  { unique: true }
);

module.exports = mongoose.model("FeeInvoice", feeInvoiceSchema);
