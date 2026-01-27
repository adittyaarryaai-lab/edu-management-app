const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const instituteController = require("../controllers/institute.controller");

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN", "INSTITUTE_ADMIN"]),
  instituteController.createInstitute
);

module.exports = router;
