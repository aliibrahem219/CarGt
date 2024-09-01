const {
  Notification,
  validateCreateNotification,
} = require("../models/Notification");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
/**----------------------------------------
 * @decs Create new notification
 * @route /api/notification
 * @method POST
 * @access private (only loggedin users)
 -----------------------------------------*/
module.exports.createNotificationCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateNotification(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const notification = await Notification.create({
    title: req.body.title,
    link: req.body.link,
    userId: req.body.userId,
  });

  res.status(201).json(notification);
});
/**----------------------------------------
 * @decs Get All Notification
 * @route /api/notification
 * @method GET
 * @access private (only user himself)
 -----------------------------------------*/
module.exports.getAllNotificationsCtrl = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    userId: req.query.user,
  }).sort({ createdAt: -1 });
  res.status(200).json(notifications);
});
/**----------------------------------------
 * @decs Delete Notification
 * @route /api/Notification/:id
 * @method DELETE
 * @access private (only owner of the Notification)
 -----------------------------------------*/
module.exports.deleteNotificationsCtrl = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }

  if (req.user.id === notification.userId.toString()) {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "notification has been deleted" });
  } else {
    res.status(403).json({ message: "access denied , not allowed" });
  }
});
