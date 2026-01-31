const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const teacherController = require("../controllers/teacher.controller");

/* -------- CREATE TEACHER -------- */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  teacherController.createTeacher
);

/* -------- GET TEACHERS -------- */
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  teacherController.getTeachers
);

/* -------- UPDATE TEACHER -------- */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  teacherController.updateTeacher
);

/* -------- DELETE TEACHER -------- */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  teacherController.deleteTeacher
);

module.exports = router;
