const mongoose = require("mongoose");
const joi = require("joi");
//Notification Schema
const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
function validateCreateNotification(obj) {
  const schema = joi.object({
    userId: joi.string().required().label("User Id"),
    title: joi.string().trim().min(2).max(200).required(),
    link: joi.string().required(),
  });
  return schema.validate(obj);
}
const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = {
  Notification,
  validateCreateNotification,
};
