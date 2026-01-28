const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const timetableController = require("../controllers/timetable.controller");

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  timetableController.createTimetable
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN", "TEACHER"]),
  timetableController.getTimetable
);

module.exports = router;
