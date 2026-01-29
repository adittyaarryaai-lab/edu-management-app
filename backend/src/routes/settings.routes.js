const express = require("express");
const InstituteSettings = require("../models/InstituteSettings");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// 🟢 Get Institute Settings
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN"]),
  async (req, res) => {
    let settings = await InstituteSettings.findOne({
      instituteId: req.user.instituteId,
    });

    // auto-create settings if not exists
    if (!settings) {
      settings = await InstituteSettings.create({
        instituteId: req.user.instituteId,
        academicYear: "2025-26",
      });
    }

    res.json(settings);
  }
);

// 🟢 Update Institute Settings
router.put(
  "/",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN"]),
  async (req, res) => {
    const settings = await InstituteSettings.findOneAndUpdate(
      { instituteId: req.user.instituteId },
      req.body,
      { new: true, upsert: true }
    );

    res.json(settings);
  }
);

module.exports = router;
