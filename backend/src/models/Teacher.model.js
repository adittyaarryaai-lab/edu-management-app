const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
      index: true
    },

    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: String,

    email: {
      type: String,
      lowercase: true
    },

    phone: String,

    subject: String,

    qualification: String,

    experienceYears: Number,

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
