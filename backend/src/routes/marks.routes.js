const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const permission = require("../middlewares/permission");

const {
  saveMarks,
  getStudentReport,
} = require("../controllers/marks.controller");

/*
|--------------------------------------------------------------------------
| TEACHER: ADD / UPDATE MARKS
|--------------------------------------------------------------------------
| Permission: marks:write
*/
router.post(
  "/",
  authMiddleware,
  permission("marks:write"),
  saveMarks
);

/*
|--------------------------------------------------------------------------
| STUDENT / PARENT: REPORT CARD
|--------------------------------------------------------------------------
| Permission: marks:read
*/
router.get(
  "/report",
  authMiddleware,
  permission("marks:read"),
  getStudentReport
);

module.exports = router;
