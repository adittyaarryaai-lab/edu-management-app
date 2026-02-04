const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const {
  uploadMaterial,
  getMaterials
} = require("../controllers/studyMaterialController");

/* Teacher uploads */
router.post(
  "/",
  auth,
  role("teacher"),
  uploadMaterial
);

/* Students / Parents / Teachers view */
router.get(
  "/",
  auth,
  role("student", "parent", "teacher"),
  getMaterials
);

module.exports = router;
