const Notification = require("../models/Notification");

/* CREATE NOTIFICATION (SYSTEM USE ONLY) */
exports.createNotification = async ({
  instituteId,
  userId,
  title,
  message,
  type
}) => {
  return Notification.create({
    instituteId,
    userId,
    title,
    message,
    type
  });
};

/* GET LOGGED-IN USER NOTIFICATIONS */
exports.getMyNotifications = async (req, res) => {
  const notifications = await Notification.find({
    instituteId: req.user.instituteId,
    userId: req.user.id
  }).sort({ createdAt: -1 });

  res.json(notifications);
};

/* MARK NOTIFICATION AS READ */
exports.markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, {
    read: true
  });

  res.json({ success: true });
};
