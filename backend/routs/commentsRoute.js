const router = require("express").Router();
const {
  createCommentCtrl,
  getAllCommentsCtrl,
  deleteCommentsCtrl,
  updateCommentCtrl,
} = require("../controllers/CommentsController");
const {
  VerifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
// /api/comments
router
  .route("/")
  .post(VerifyToken, createCommentCtrl)
  .get(verifyTokenAndAdmin, getAllCommentsCtrl);
// /api/comments/:id
router
  .route("/:id")
  .delete(validateObjectId, VerifyToken, deleteCommentsCtrl)
  .put(validateObjectId, VerifyToken, updateCommentCtrl);
module.exports = router;
