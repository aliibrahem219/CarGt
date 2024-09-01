const mongoose = require("mongoose");
const joi = require("joi");
//Comment Schema
const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
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
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Comment Model
const Comment = mongoose.model("Comment", commentSchema);
//Validate Create Comment
function validateCreateComment(obj) {
  const schema = joi.object({
    postId: joi.string().required().label("Post Id"),
    text: joi.string().trim().required().label("Text"),
  });
  return schema.validate(obj);
}
//Validate Update Comment
function validateUpdateComment(obj) {
  const schema = joi.object({
    text: joi.string().trim().required(),
  });
  return schema.validate(obj);
}
module.exports = {
  Comment,
  validateCreateComment,
  validateUpdateComment,
};
