const express = require("express");
const router = express.Router();

const ParentStudent = require("../models/ParentStudent");
const parentController = require("../controllers/parent.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// ✅ Create Parent (Admin)
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN"]),
  parentController.createParent
);

// ✅ Link Parent to Student
router.post(
  "/link",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN"]),
  async (req, res) => {
    try {
      const link = await ParentStudent.create({
        ...req.body,
        instituteId: req.user.instituteId,
      });
      res.status(201).json(link);
    } catch (err) {
      res.status(400).json({ message: "Already linked or invalid data" });
    }
  }
);

// ✅ Parent fetch children
router.get(
  "/children",
  authMiddleware,
  roleMiddleware(["PARENT"]),
  async (req, res) => {
    const children = await ParentStudent.find({
      parentId: req.user.userId,
      instituteId: req.user.instituteId,
    }).populate("studentId");

    res.json(children);
  }
);

module.exports = router;
