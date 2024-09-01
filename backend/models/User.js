const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
//User Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        publicId: null,
      },
    },
    bio: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
    customers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});
UserSchema.virtual("notifications", {
  ref: "Notification",
  foreignField: "userId",
  localField: "_id",
});
UserSchema.virtual("evaliations", {
  ref: "Evaliation",
  foreignField: "profileId",
  localField: "_id",
});
UserSchema.virtual("offers", {
  ref: "Offer",
  foreignField: "user",
  localField: "_id",
});

//Gernerate Auth Token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
//User Model
const User = mongoose.model("User", UserSchema);
//Validate Register User
function validateRegisterUser(obj) {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(100).required(),
    email: joi.string().trim().min(5).max(100).required().email(),
    phoneNumber: joi
      .string()
      .pattern(/^\d{10}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be exactly 10 digits.",
      }),
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}
//Validate login User
function validateLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
    password: joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}
//Validate Update User
function validateUpdateUser(obj) {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(100),
    phoneNumber: joi
      .string()
      .pattern(/^\d{10}$/)

      .messages({
        "string.pattern.base": "Phone number must be exactly 10 digits.",
      }),
    password: passwordComplexity(),
    bio: joi.string(),
  });
  return schema.validate(obj);
}

//Validate Email
function validateEmail(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
  });
  return schema.validate(obj);
}
//Validate New Password
function validateNewPassword(obj) {
  const schema = joi.object({
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
  validateEmail,
  validateNewPassword,
};
