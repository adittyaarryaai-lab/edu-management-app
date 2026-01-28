const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const classController = require("../controllers/class.controller");

// Admin creates class
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  classController.createClass
);

// Admin views classes
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  classController.getClasses
);

module.exports = router;
