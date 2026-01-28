const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const examController = require("../controllers/exam.controller");

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN", "SUPER_ADMIN"]),
  examController.createExam
);

router.get(
  "/",
  authMiddleware,
  examController.getExams
);

module.exports = router;
