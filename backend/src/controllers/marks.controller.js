const Marks = require("../models/Marks.model");

/* ================================
   ADD / UPDATE MARKS (Teacher)
   ================================ */
exports.saveMarks = async (req, res) => {
  try {
    const { studentId, examId, subjectMarks } = req.body;

    const marks = await Marks.findOneAndUpdate(
      {
        instituteId: req.user.instituteId,
        studentId,
        examId,
      },
      {
        subjectMarks,
        enteredBy: req.user.userId, // teacher id
      },
      {
        upsert: true,   // same exam me dobara aaye to update
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Marks saved successfully",
      data: marks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to save marks",
    });
  }
};

/* ================================
   GET STUDENT REPORT CARD
   ================================ */
exports.getStudentReport = async (req, res) => {
  try {
    const { studentId } = req.query;

    const report = await Marks.find({
      instituteId: req.user.instituteId,
      studentId,
    }).populate("examId");

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch report card",
    });
  }
};
