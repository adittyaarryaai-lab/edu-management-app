const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const studentController = require("../controllers/student.controller");

/* ---------------- CREATE STUDENT ---------------- */
/* Only SUPER_ADMIN & INSTITUTE_ADMIN */

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  studentController.createStudent
);

/* ---------------- GET STUDENTS ---------------- */
/* Admin + Teacher can view students */

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN", "TEACHER"]),
  studentController.getStudents
);

/* ---------------- UPDATE STUDENT ---------------- */
/* Only SUPER_ADMIN & INSTITUTE_ADMIN */

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  studentController.updateStudent
);

/* ---------------- DELETE STUDENT ---------------- */
/* Only SUPER_ADMIN & INSTITUTE_ADMIN */

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  studentController.deleteStudent
);

module.exports = router;
