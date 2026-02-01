const Exam = require("../models/Exam.model");

/* =====================================================
   CREATE EXAM (Institute Admin)
   ===================================================== */
exports.createExam = async (req, res) => {
  try {
    const {
      name,
      className,
      section,
      subjects,
      date
    } = req.body;

    const exam = await Exam.create({
      instituteId: req.user.instituteId,
      name,
      className,
      section,
      subjects, // [{ name, maxMarks }]
      date,
      createdBy: req.user.userId
    });

    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      exam
    });

  } catch (error) {
    console.error("Create Exam Error:", error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/* =====================================================
   GET EXAMS (Class + Section wise)
   Admin & Teacher
   ===================================================== */
exports.getExams = async (req, res) => {
  try {
    const { className, section } = req.query;

    const filter = {
      instituteId: req.user.instituteId
    };

    if (className) filter.className = className;
    if (section) filter.section = section;

    const exams = await Exam.find(filter)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: exams.length,
      exams
    });

  } catch (error) {
    console.error("Get Exams Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch exams"
    });
  }
};
