const router = require("express").Router();
const {
  createPostCtrl,
  getAllPostCtrl,
  getSinglePostCtrl,
  getPostCountCtrl,
  deletePostCtrl,
  updatePostCtrl,
  updatePostImageCtrl,
  toggleLikeCtrl,
  getAllPostsAdminCtrl,
  acceptPostCtrl,
} = require("../controllers/postController");
const photoUpload = require("../middlewares/photoUpload");
const {
  VerifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
// /api/post

router
  .route("/")
  .post(VerifyToken, photoUpload.single("image"), createPostCtrl)
  .get(getAllPostCtrl);
router.route("/admin").get(verifyTokenAndAdmin, getAllPostsAdminCtrl);
router.route("/count").get(getPostCountCtrl);
// /api/post/:id
router
  .route("/:id")
  .get(validateObjectId, getSinglePostCtrl)
  .delete(validateObjectId, verifyTokenAndAuthorization, deletePostCtrl)
  .put(validateObjectId, VerifyToken, updatePostCtrl);
// /api/post/accept/:id
router
  .route("/accept/:id")
  .put(validateObjectId, verifyTokenAndAdmin, acceptPostCtrl);
// /api/post/update-image/:id
router
  .route("/update-image/:id")
  .put(
    validateObjectId,
    VerifyToken,
    photoUpload.single("image"),
    updatePostImageCtrl
  );
// /api/post/like/:id
router.route("/like/:id").put(validateObjectId, VerifyToken, toggleLikeCtrl);

module.exports = router;
