const Marks = require("../models/Marks.model");

// Enter Marks (Teacher)
exports.enterMarks = async (req, res) => {
  try {
    const marks = await Marks.create({
      ...req.body,
      instituteId: req.user.instituteId,
      enteredBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      marks,
    });
  } catch (error) {
    res.status(400).json({
      message: "Marks already entered or invalid data",
    });
  }
};

// Get Student Report
exports.getStudentReport = async (req, res) => {
  const { studentId, examId } = req.params;

  const data = await Marks.find({
    studentId,
    examId,
    instituteId: req.user.instituteId,
  });

  res.json({
    success: true,
    report: data,
  });
};
