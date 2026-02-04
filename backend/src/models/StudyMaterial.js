const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
      index: true
    },

    className: {
      type: String,
      required: true
    },

    subject: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: String,

    fileUrl: String,   // PDF / Drive / S3 later
    linkUrl: String,   // External reference

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);
