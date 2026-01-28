const express = require("express");
const Attendance = require("../models/Attendance.model");
const Timetable = require("../models/Timetable.model");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// 🟢 MARK ATTENDANCE (Teacher only, Timetable locked)
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["TEACHER"]),
  async (req, res) => {
    const { className, subject, periodNumber, date, records } = req.body;

    try {
      // ✅ Verify teacher assignment from timetable
      const timetable = await Timetable.findOne({
        instituteId: req.user.instituteId,
        className,
        subject,
        teacherId: req.user._id,
        period: periodNumber,
      });

      if (!timetable) {
        return res.status(403).json({
          message: "You are not assigned to this class/period",
        });
      }

      const attendanceEntries = records.map((r) => ({
        instituteId: req.user.instituteId,
        className,
        studentId: r.studentId,
        teacherId: req.user._id,
        subject,
        date,
        periodNumber,
        status: r.status,
      }));

      await Attendance.insertMany(attendanceEntries);

      res.status(201).json({ message: "Attendance marked successfully" });
    } catch (error) {
      res.status(400).json({
        message: "Attendance already marked or invalid data",
      });
    }
  }
);

// 🔵 STUDENT / PARENT VIEW
router.get(
  "/student/:studentId",
  authMiddleware,
  async (req, res) => {
    const attendance = await Attendance.find({
      studentId: req.params.studentId,
      instituteId: req.user.instituteId,
    });

    res.json(attendance);
  }
);

module.exports = router;
