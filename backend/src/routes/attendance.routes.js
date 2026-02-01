const express = require("express");
const Attendance = require("../models/Attendance.model");
const Timetable = require("../models/Timetable.model");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| 🟢 MARK ATTENDANCE (Teacher only, Timetable locked, UPSERT SAFE)
|--------------------------------------------------------------------------
*/
router.post(
  "/mark",
  authMiddleware,
  roleMiddleware(["TEACHER"]),
  async (req, res) => {
    const { classId, subject, periodNumber, date, records } = req.body;

    try {
      /* ✅ Verify teacher assignment from timetable */
      const timetable = await Timetable.findOne({
        instituteId: req.user.instituteId,
        classId,
        subject,
        teacherId: req.user.userId,
        period: periodNumber,
      });

      if (!timetable) {
        return res.status(403).json({
          message: "You are not assigned to this class / period",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | ✅ BULK UPSERT LOGIC (No duplicate crash)
      |--------------------------------------------------------------------------
      | One student + date + period = one record
      | Same day re-mark = overwrite
      */
      const operations = records.map((r) => ({
        updateOne: {
          filter: {
            instituteId: req.user.instituteId,
            studentId: r.studentId,
            date,
            periodNumber,
          },
          update: {
            $set: {
              instituteId: req.user.instituteId,
              classId,
              subject,
              periodNumber,
              date,
              studentId: r.studentId,
              teacherId: req.user.userId,
              status: r.status,
            },
          },
          upsert: true,
        },
      }));

      await Attendance.bulkWrite(operations);

      res.status(200).json({
        message: "Attendance saved successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to mark attendance",
      });
    }
  }
);

/*
|--------------------------------------------------------------------------
| 🔵 STUDENT / PARENT VIEW (Read only)
|--------------------------------------------------------------------------
*/
router.get(
  "/student/:studentId",
  authMiddleware,
  async (req, res) => {
    try {
      const attendance = await Attendance.find({
        studentId: req.params.studentId,
        instituteId: req.user.instituteId,
      }).sort({ date: -1 });

      res.json(attendance);
    } catch (err) {
      res.status(500).json({
        message: "Failed to fetch attendance",
      });
    }
  }
);

module.exports = router;
