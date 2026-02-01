const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const {
  saveMarks,
  getStudentReport,
} = require("../controllers/marks.controller");

/* ================================
   TEACHER: ADD / UPDATE MARKS
   ================================ */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["TEACHER"]),
  saveMarks
);

/* ================================
   STUDENT / PARENT: REPORT CARD
   ================================ */
router.get(
  "/report",
  authMiddleware,
  roleMiddleware(["STUDENT", "PARENT"]),
  getStudentReport
);

module.exports = router;
