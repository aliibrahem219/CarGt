const mongoose = require("mongoose");
const joi = require("joi");
//Evaliation Schema
const EvaliationSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Evaliation Model
const Evaliation = mongoose.model("Evaliation", EvaliationSchema);
//Validate Create Evaliation
function validateCreateEvaliation(obj) {
  const schema = joi.object({
    profileId: joi.string().required().label("Profile Id"),
    text: joi.string().trim().required().label("Text"),
    rating: joi.number().required(),
  });
  return schema.validate(obj);
}
//Validate Update Evaliation
function validateUpdateEvaliation(obj) {
  const schema = joi.object({
    text: joi.string().trim().required(),
    rating: joi.number(),
  });
  return schema.validate(obj);
}
module.exports = {
  Evaliation,
  validateCreateEvaliation,
  validateUpdateEvaliation,
};
