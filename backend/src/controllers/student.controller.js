const Student = require("../models/Student.model");

/* ================= CREATE STUDENT ================= */

exports.createStudent = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;

    const {
      firstName,
      lastName,
      email,
      phone,
      className,
      section,
      rollNumber,
      parentName,
      parentPhone,
    } = req.body;

    // Basic validation
    if (!firstName || !className) {
      return res.status(400).json({
        message: "First name and class are required",
      });
    }

    const student = await Student.create({
      instituteId,
      firstName,
      lastName,
      email,
      phone,
      className,
      section,
      rollNumber,
      parentName,
      parentPhone,
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });

  } catch (error) {
    console.error("Create Student Error:", error);
    res.status(500).json({
      message: "Student creation failed",
    });
  }
};

/* ================= GET ALL STUDENTS ================= */

exports.getStudents = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;

    const students = await Student.find({ instituteId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: students.length,
      students,
    });

  } catch (error) {
    console.error("Fetch Students Error:", error);
    res.status(500).json({
      message: "Failed to fetch students",
    });
  }
};
