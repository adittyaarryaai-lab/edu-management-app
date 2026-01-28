const Exam = require("../models/Exam.model");

// Create Exam (Admin)
exports.createExam = async (req, res) => {
  try {
    const exam = await Exam.create({
      ...req.body,
      instituteId: req.user.instituteId,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      exam,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Exams for Class
exports.getExams = async (req, res) => {
  const { className, section } = req.query;

  const exams = await Exam.find({
    instituteId: req.user.instituteId,
    className,
    section,
  });

  res.json({
    success: true,
    exams,
  });
};
