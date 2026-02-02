const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const {
  classPerformance
} = require("../controllers/analyticsController");

router.get(
  "/class-performance",
  auth,
  role("institute_admin"),
  classPerformance
);

module.exports = router;
