const express = require("express");
const Exam = require("../models/Exam.model");
const InstituteSettings = require("../models/InstituteSettings");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const examController = require("../controllers/exam.controller");

const router = express.Router();

/**
 * =========================
 * CREATE EXAM (ADMIN)
 * =========================
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN"]),
  async (req, res) => {
    try {
      // 🔒 FEATURE TOGGLE CHECK
      const settings = await InstituteSettings.findOne({
        instituteId: req.user.instituteId,
      });

      if (!settings || !settings.examsEnabled) {
        return res.status(403).json({
          message: "Exams module is disabled by institute",
        });
      }

      const exam = await Exam.create({
        ...req.body,
        instituteId: req.user.instituteId,
        academicYear: req.academicYear, // auto-attached
        createdBy: req.user._id,
      });

      res.status(201).json(exam);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

/**
 * =========================
 * GET EXAMS (ADMIN / TEACHER)
 * =========================
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN", "TEACHER"]),
  async (req, res) => {
    const exams = await Exam.find({
      instituteId: req.user.instituteId,
      academicYear: req.academicYear,
    }).sort({ createdAt: -1 });

    res.json(exams);
  }
);

/**
 * =========================
 * GET SINGLE EXAM
 * =========================
 */
router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {
    const exam = await Exam.findOne({
      _id: req.params.id,
      instituteId: req.user.instituteId,
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json(exam);
  }
);

/**
 * =========================
 * DELETE EXAM (ADMIN)
 * =========================
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN"]),
  async (req, res) => {
    await Exam.deleteOne({
      _id: req.params.id,
      instituteId: req.user.instituteId,
    });

    res.json({ message: "Exam deleted successfully" });
  }
);

module.exports = router;
