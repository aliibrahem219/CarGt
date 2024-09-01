const asyncHandler = require("express-async-handler");
const {
  Comment,
  validateCreateComment,
  validateUpdateComment,
} = require("../models/Comments");
const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { notification } = require("../middlewares/notificaion");
/**----------------------------------------
 * @decs Create new Comment
 * @route /api/comments
 * @method POST
 * @access private (only loggedin users)
 -----------------------------------------*/
module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const profile = await User.findById(req.user.id);
  const comment = await Comment.create({
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
    username: profile.username,
  });
  const user = await Post.findById(req.body.postId);

  await notification({
    title: ` ${profile.username} add a comment on your post`,
    link: `/posts/details/${req.body.postId}`,
    userId: user.user.toString(),
  });
  res.status(201).json(comment);
});
/**----------------------------------------
 * @decs Get All Comments
 * @route /api/comments
 * @method GET
 * @access private (only admin)
 -----------------------------------------*/
module.exports.getAllCommentsCtrl = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate("user");
  res.status(200).json(comments);
});
/**----------------------------------------
 * @decs Delete Comment
 * @route /api/comments/:id
 * @method DELETE
 * @access private (only admin or owner of the comment)
 -----------------------------------------*/
module.exports.deleteCommentsCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  if (req.user.isAdmin || req.user.id === comment.user.toString()) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment has been deleted" });
  } else {
    res.status(403).json({ message: "access denied , not allowed" });
  }
});
/**----------------------------------------
 * @decs Update Comment
 * @route /api/comments/:id
 * @method PUT
 * @access private (only owner of the comment)
 -----------------------------------------*/
module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }
  if (req.user.id !== comment.user.toString()) {
    res.status(403).json({
      message: "access denied , only user himself can update his comment",
    });
  }
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        text: req.body.text,
      },
    },
    { new: true }
  );
  res.status(200).json(updatedComment);
});
