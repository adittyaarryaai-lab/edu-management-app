const mongoose = require("mongoose");

const feeLedgerSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
      index: true
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    className: String,

    totalFee: Number,

    paidAmount: {
      type: Number,
      default: 0
    },

    transactions: [
      {
        amount: Number,
        mode: String, // cash, online, cheque
        date: {
          type: Date,
          default: Date.now
        },
        reference: String
      }
    ]
  },
  { timestamps: true }
);

/* virtual due calculation */
feeLedgerSchema.virtual("dueAmount").get(function () {
  return this.totalFee - this.paidAmount;
});

module.exports = mongoose.model("FeeLedger", feeLedgerSchema);
