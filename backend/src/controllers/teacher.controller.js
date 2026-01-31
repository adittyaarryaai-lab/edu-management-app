const Teacher = require("../models/Teacher.model");

/* ---------------- CREATE TEACHER ---------------- */

exports.createTeacher = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;

    const {
      firstName,
      subject,
      experienceYears,
      email,
      phone,
      qualification,
    } = req.body;

    if (!firstName) {
      return res.status(400).json({
        success: false,
        message: "Teacher first name is required",
      });
    }

    const teacher = await Teacher.create({
      instituteId,
      firstName,
      subject,            // ✅ singular
      experienceYears,
      email,
      phone,
      qualification,
    });

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: teacher,
    });

  } catch (error) {
    console.error("Create Teacher Error:", error);
    res.status(500).json({
      success: false,
      message: "Teacher creation failed",
    });
  }
};

/* ---------------- GET ALL TEACHERS ---------------- */

exports.getTeachers = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;

    const teachers = await Teacher.find({ instituteId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: teachers,
    });

  } catch (error) {
    console.error("Fetch Teachers Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch teachers",
    });
  }
};

/* ---------------- UPDATE TEACHER ---------------- */

exports.updateTeacher = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;
    const teacherId = req.params.id;

    const updatedTeacher = await Teacher.findOneAndUpdate(
      { _id: teacherId, instituteId },
      req.body,
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: updatedTeacher,
    });

  } catch (error) {
    console.error("Update Teacher Error:", error);
    res.status(500).json({
      success: false,
      message: "Teacher update failed",
    });
  }
};

/* ---------------- DELETE TEACHER ---------------- */

exports.deleteTeacher = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;
    const teacherId = req.params.id;

    const deletedTeacher = await Teacher.findOneAndDelete({
      _id: teacherId,
      instituteId,
    });

    if (!deletedTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
    });

  } catch (error) {
    console.error("Delete Teacher Error:", error);
    res.status(500).json({
      success: false,
      message: "Teacher delete failed",
    });
  }
};
