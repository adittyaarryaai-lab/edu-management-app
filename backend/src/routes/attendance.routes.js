const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const attendanceController = require("../controllers/attendance.controller");

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["TEACHER"]),
  attendanceController.markAttendance
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  attendanceController.getAttendance
);

module.exports = router;
