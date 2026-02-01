const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const timetableController = require("../controllers/timetable.controller");

/* ---------- SAVE / UPDATE TIMETABLE ---------- */
/* Only Super Admin & Institute Admin */

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  timetableController.saveTimetable
);

/* ---------- GET TIMETABLE (VIEW) ---------- */
/* Admin + Teacher (students later) */

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN", "TEACHER"]),
  timetableController.getTimetable
);

module.exports = router;
