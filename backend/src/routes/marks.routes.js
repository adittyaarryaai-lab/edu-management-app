const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const marksController = require("../controllers/marks.controller");

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["TEACHER"]),
  marksController.enterMarks
);

router.get(
  "/student/:studentId/exam/:examId",
  authMiddleware,
  marksController.getStudentReport
);

module.exports = router;
