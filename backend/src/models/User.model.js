const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "SUPER_ADMIN",
        "INSTITUTE_ADMIN",
        "TEACHER",
        "STUDENT",
        "PARENT",
        "ACCOUNTANT",
      ],
      default: "STUDENT",
    },

    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
