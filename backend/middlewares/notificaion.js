const {
  Notification,
  validateCreateNotification,
} = require("../models/Notification");
module.exports.notification = async ({ title, link, userId }) => {
  const { error } = validateCreateNotification({
    title,
    link,
    userId,
  });
  if (error) {
    return error;
  }
  const notification = await Notification.create({
    title: title,
    link: link,
    userId: userId,
  });
  return notification;
};
