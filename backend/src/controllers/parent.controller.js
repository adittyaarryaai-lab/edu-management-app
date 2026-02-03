const User = require("../models/User.model");
const ParentStudent = require("../models/ParentStudent");
const Attendance = require("../models/Attendance.model");
const Marks = require("../models/Marks.model");
const FeeLedger = require("../models/FeeLedger");

/* =========================
   CREATE PARENT (ADMIN)
========================= */
exports.createParent = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Parent already exists" });
    }

    const parent = await User.create({
      name,
      email,
      phone,
      password,
      role: "parent", // ⚠️ role lowercase as per system
      instituteId: req.user.instituteId
    });

    res.status(201).json({
      success: true,
      message: "Parent created successfully",
      parent
    });

  } catch (error) {
    res.status(500).json({ message: "Parent creation failed" });
  }
};


/* =========================
   PARENT DASHBOARD
========================= */
exports.getChildDashboard = async (req, res) => {
  try {
    /* Step 1: find linked student */
    const link = await ParentStudent.findOne({
      instituteId: req.user.instituteId,
      parentId: req.user.id
    });

    if (!link) {
      return res.status(404).json({
        message: "No child linked with this parent"
      });
    }

    const studentId = link.studentId;

    /* Step 2: Attendance summary */
    const attendanceRecords = await Attendance.find({ studentId });
    const present = attendanceRecords.filter(
      a => a.status === "present"
    ).length;
    const total = attendanceRecords.length;

    /* Step 3: Exam & marks */
    const exams = await Marks.find({ studentId }).populate("examId");

    /* Step 4: Fee status */
    const fees = await FeeLedger.findOne({ studentId });

    res.json({
      studentId,
      attendance: {
        present,
        total,
        percentage: total
          ? ((present / total) * 100).toFixed(2)
          : 0
      },
      exams,
      fees
    });

  } catch (error) {
    res.status(500).json({
      message: "Parent dashboard failed"
    });
  }
};
