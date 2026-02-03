const express = require("express");
const Notification = require("../models/Notification");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET MY NOTIFICATIONS
|--------------------------------------------------------------------------
| Logged-in user ke liye sirf uske notifications
| Institute isolated + user isolated
*/
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const notifications = await Notification.find({
        instituteId: req.user.instituteId,
        userId: req.user.userId
      }).sort({ createdAt: -1 });

      res.json(notifications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  }
);

/*
|--------------------------------------------------------------------------
| MARK NOTIFICATION AS READ
|--------------------------------------------------------------------------
| Append-only system (delete kabhi nahi)
*/
router.patch(
  "/:id/read",
  authMiddleware,
  async (req, res) => {
    try {
      await Notification.findOneAndUpdate(
        {
          _id: req.params.id,
          instituteId: req.user.instituteId,
          userId: req.user.userId
        },
        { read: true }
      );

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update notification" });
    }
  }
);

module.exports = router;
