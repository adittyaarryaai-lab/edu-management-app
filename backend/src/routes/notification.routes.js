const express = require("express");
const Notification = require("../models/Notification");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// 🟢 CREATE NOTIFICATION
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["INSTITUTE_ADMIN", "TEACHER"]),
  async (req, res) => {
    try {
      const notification = await Notification.create({
        title: req.body.title,
        message: req.body.message,
        targetRole: req.body.targetRole || "ALL",
        studentId: req.body.studentId || null,

        instituteId: req.user.instituteId, // ✅ MUST exist
        createdBy: req.user.userId,         // ✅ FIXED
      });

      res.status(201).json(notification);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }
);

// 🔵 GET NOTIFICATIONS
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    const notifications = await Notification.find({
      instituteId: req.user.instituteId,
      $or: [
        { targetRole: "ALL" },
        { targetRole: req.user.role },
        { studentId: req.user.userId },
      ],
    }).sort({ createdAt: -1 });

    res.json(notifications);
  }
);

module.exports = router;
