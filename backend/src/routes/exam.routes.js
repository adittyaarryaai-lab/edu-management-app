const express = require("express");
const Exam = require("../models/Exam.model");
const InstituteSettings = require("../models/InstituteSettings");

const authMiddleware = require("../middlewares/auth.middleware");
const permission = require("../middlewares/permission");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| CREATE EXAM
|--------------------------------------------------------------------------
| Permission: exams:manage
*/
router.post(
  "/",
  authMiddleware,
  permission("exams:manage"),
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
        academicYear: req.academicYear,
        createdBy: req.user._id,
      });

      res.status(201).json(exam);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

/*
|--------------------------------------------------------------------------
| GET EXAMS LIST
|--------------------------------------------------------------------------
| Permission: exams:read
*/
router.get(
  "/",
  authMiddleware,
  permission("exams:read"),
  async (req, res) => {
    const exams = await Exam.find({
      instituteId: req.user.instituteId,
      academicYear: req.academicYear,
    }).sort({ createdAt: -1 });

    res.json(exams);
  }
);

/*
|--------------------------------------------------------------------------
| GET SINGLE EXAM
|--------------------------------------------------------------------------
| Permission: exams:read
*/
router.get(
  "/:id",
  authMiddleware,
  permission("exams:read"),
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

/*
|--------------------------------------------------------------------------
| DELETE EXAM
|--------------------------------------------------------------------------
| Permission: exams:manage
*/
router.delete(
  "/:id",
  authMiddleware,
  permission("exams:manage"),
  async (req, res) => {
    await Exam.deleteOne({
      _id: req.params.id,
      instituteId: req.user.instituteId,
    });

    res.json({ message: "Exam deleted successfully" });
  }
);

module.exports = router;
