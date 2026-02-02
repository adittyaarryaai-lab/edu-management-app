const Marks = require("../models/Marks.model");
const { getGrade } = require("../utils/gradeUtils");

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
   GET STUDENT REPORT CARD (UPGRADED)
   ================================ */
exports.getStudentReport = async (req, res) => {
  try {
    const { studentId } = req.query;

    const records = await Marks.find({
      instituteId: req.user.instituteId,
      studentId,
    }).populate("examId");

    const report = records.map(record => {
      let total = 0;
      let maxTotal = 0;

      record.subjectMarks.forEach(s => {
        total += s.marks;

        const examSubject = record.examId.subjects.find(
          sub => sub.name === s.subject
        );

        if (examSubject) {
          maxTotal += examSubject.maxMarks;
        }
      });

      const percentage = maxTotal
        ? Number(((total / maxTotal) * 100).toFixed(2))
        : 0;

      return {
        examId: record.examId._id,
        examName: record.examId.name,
        total,
        maxTotal,
        percentage,
        grade: getGrade(percentage),
        subjectMarks: record.subjectMarks,
      };
    });

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
