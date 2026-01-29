const mongoose = require("mongoose");

const instituteSettingsSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      unique: true,
      required: true,
    },

    academicYear: {
      type: String,
      required: true, // 2025-26
    },

    attendanceEnabled: {
      type: Boolean,
      default: true,
    },

    examsEnabled: {
      type: Boolean,
      default: true,
    },

    feesEnabled: {
      type: Boolean,
      default: true,
    },

    parentPortalEnabled: {
      type: Boolean,
      default: true,
    },

    passwordPolicy: {
      minLength: {
        type: Number,
        default: 6,
      },
      requireNumber: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InstituteSettings", instituteSettingsSchema);
