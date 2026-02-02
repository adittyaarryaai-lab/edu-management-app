const express = require("express");
const Attendance = require("../models/Attendance.model");
const Marks = require("../models/Marks.model");
const ParentStudent = require("../models/ParentStudent");
const FeeLedger = require("../models/FeeLedger"); // ✅ LEDGER ONLY

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

/* =====================================================
   🟢 ATTENDANCE REPORT (ADMIN)
===================================================== */
router.get(
  "/attendance/class/:classId",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN"]),
  async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          message: "startDate and endDate are required (YYYY-MM-DD)",
        });
      }

      const report = await Attendance.aggregate([
        {
          $match: {
            instituteId: req.user.instituteId,
            classId: req.params.classId,
            date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
        {
          $group: {
            _id: {
              studentId: "$studentId",
              status: "$status",
            },
            count: { $sum: 1 },
          },
        },
      ]);

      res.json(report);
    } catch (error) {
      res.status(500).json({ message: "Attendance report failed" });
    }
  }
);

/* =====================================================
   🟢 EXAM PERFORMANCE REPORT (ADMIN)
===================================================== */
router.get(
  "/exams/:examId/class/:classId",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN"]),
  async (req, res) => {
    try {
      const report = await Marks.aggregate([
        {
          $match: {
            instituteId: req.user.instituteId,
            examId: req.params.examId,
          },
        },
        { $unwind: "$subjectMarks" },
        {
          $group: {
            _id: "$subjectMarks.subject",
            averageMarks: { $avg: "$subjectMarks.marks" },
          },
        },
      ]);

      res.json(report);
    } catch (error) {
      res.status(500).json({ message: "Exam report failed" });
    }
  }
);

/* =====================================================
   🟢 FEE DUE REPORT (ADMIN) — LEDGER BASED ✅
===================================================== */
router.get(
  "/fees/due",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN"]),
  async (req, res) => {
    try {
      const dues = await FeeLedger.find({
        instituteId: req.user.instituteId,
        $expr: { $gt: ["$totalFee", "$paidAmount"] },
      }).populate("studentId");

      res.json(dues);
    } catch (error) {
      res.status(500).json({ message: "Fee due report failed" });
    }
  }
);

/* =====================================================
   🟢 PARENT DASHBOARD SUMMARY
===================================================== */
router.get(
  "/parent/summary",
  authMiddleware,
  roleMiddleware(["PARENT"]),
  async (req, res) => {
    try {
      const links = await ParentStudent.find({
        parentId: req.user._id,
        instituteId: req.user.instituteId,
      });

      const studentIds = links.map((l) => l.studentId);

      const attendance = await Attendance.find({
        studentId: { $in: studentIds },
      });

      const fees = await FeeLedger.find({
        studentId: { $in: studentIds },
      });

      res.json({ attendance, fees });
    } catch (error) {
      res.status(500).json({ message: "Parent summary failed" });
    }
  }
);

module.exports = router;
