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
      classId,
      className,
      section,
      rollNumber,
      parentName,
      parentPhone,
    } = req.body;

    // Basic validation
    if (!firstName || !classId || !className) {
      return res.status(400).json({
        message: "First name,classId and className are required",
      });
    }

    const student = await Student.create({
      instituteId,
      firstName,
      lastName,
      email,
      phone,
      classId,
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

    // 🔥 IMPORTANT — disable cache
    res.set("Cache-Control", "no-store");

    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch students failed" });
  }
};

/* ---------------- UPDATE STUDENT ---------------- */

exports.updateStudent = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;

    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, instituteId },
      req.body,
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};
/* ---------------- DELETE STUDENT ---------------- */

exports.deleteStudent = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;

    const student = await Student.findOneAndDelete({
      _id: req.params.id,
      instituteId
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};
