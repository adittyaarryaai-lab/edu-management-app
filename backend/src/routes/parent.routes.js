const express = require("express");
const router = express.Router();

const ParentStudent = require("../models/ParentStudent");
const parentController = require("../controllers/parent.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

/* ===============================
   ADMIN: CREATE PARENT USER
   =============================== */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN"]),
  parentController.createParent
);

/* ===============================
   ADMIN: LINK PARENT ↔ STUDENT
   =============================== */
router.post(
  "/link",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN"]),
  async (req, res) => {
    try {
      const link = await ParentStudent.create({
        parentId: req.body.parentId,
        studentId: req.body.studentId,
        instituteId: req.user.instituteId
      });

      res.status(201).json(link);
    } catch (err) {
      res.status(400).json({
        message: "Already linked or invalid data"
      });
    }
  }
);

/* ===============================
   PARENT: FETCH LINKED CHILDREN
   =============================== */
router.get(
  "/children",
  authMiddleware,
  roleMiddleware(["PARENT"]),
  async (req, res) => {
    const children = await ParentStudent.find({
      parentId: req.user.userId,
      instituteId: req.user.instituteId
    }).populate("studentId");

    res.json(children);
  }
);

/* ===============================
   PARENT: CHILD DASHBOARD (DAY 27)
   =============================== */
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(["PARENT"]),
  parentController.getChildDashboard
);

module.exports = router;
