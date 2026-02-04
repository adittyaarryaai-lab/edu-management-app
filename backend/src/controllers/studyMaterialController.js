const StudyMaterial = require("../models/StudyMaterial");

/* UPLOAD MATERIAL (Teacher only) */
exports.uploadMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.create({
      instituteId: req.user.instituteId,
      uploadedBy: req.user.id,
      ...req.body
    });

    res.json(material);
  } catch (err) {
    res.status(500).json({
      message: "Material upload failed"
    });
  }
};

/* GET MATERIALS (Student / Parent / Teacher) */
exports.getMaterials = async (req, res) => {
  try {
    const { className, subject } = req.query;

    const materials = await StudyMaterial.find({
      instituteId: req.user.instituteId,
      className,
      subject
    }).sort({ createdAt: -1 });

    res.json(materials);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch materials"
    });
  }
};
