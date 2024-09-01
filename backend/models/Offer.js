const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
//offer Schema
const OfferSchema = new mongoose.Schema(
  {
    carName: {
      type: String,
      required: true,
      trim: true,
    },
    make: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    color: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    fualType: {
      type: String,
      required: true,
    },
    gearbox: {
      type: String,
      required: true,
    },
    ABS: {
      type: Boolean,
      required: true,
    },
    cdPlayer: {
      type: Boolean,
      required: true,
    },
    electricWindows: {
      type: Boolean,
      required: true,
    },
    fogLamp: {
      type: Boolean,
      required: true,
    },
    sunRoof: {
      type: Boolean,
      required: true,
    },
    centralLocking: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    views: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    hightlighting: {
      type: Number,
      default: 0,
    },
    top: {
      type: Number,
      default: 0,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    booking: {
      type: Object,
      customer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      value: {
        type: Number,
        default: 0,
      },
      username: {
        type: String,
      },
      default: {},
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Offer = mongoose.model("Offer", OfferSchema);

//Validate Create offer
function validateCreateOffer(obj) {
  const schema = joi.object({
    carName: joi.string().trim().required().max(200),
    make: joi.string().trim().required(),
    description: joi.string().trim().min(10).required(),
    category: joi.string().trim().required(),
    color: joi.string().trim().required(),
    year: joi.number().required().min(1990).max(2024),
    distance: joi.number().required(),
    city: joi.string().required(),
    fualType: joi.string().required(),
    gearbox: joi.string().required(),
    ABS: joi.boolean().required(),
    cdPlayer: joi.boolean().required(),
    electricWindows: joi.boolean().required(),
    fogLamp: joi.boolean().required(),
    sunRoof: joi.boolean().required(),
    centralLocking: joi.boolean().required(),
    price: joi.string().required(),
  });
  return schema.validate(obj);
}
//Validate Update offer
function validateUpdateOffer(obj) {
  const schema = joi.object({
    carName: joi.string().trim().max(200),
    make: joi.string().trim(),
    description: joi.string().trim().min(10),
    category: joi.string().trim(),
    color: joi.string().trim(),
    year: joi.number().min(1990).max(2024),
    distance: joi.number(),
    city: joi.string(),
    fualType: joi.string(),
    gearbox: joi.string(),
    ABS: joi.boolean(),
    cdPlayer: joi.boolean(),
    electricWindows: joi.boolean(),
    fogLamp: joi.boolean(),
    sunRoof: joi.boolean(),
    centralLocking: joi.boolean(),
    price: joi.string(),
  });
  return schema.validate(obj);
}
module.exports = {
  Offer,
  validateCreateOffer,
  validateUpdateOffer,
};
