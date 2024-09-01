const router = require("express").Router();
const {
  getAllUsersCtrl,
  getUserProfileCtrl,
  updateUserProfileCtrl,
  getUsersCountCtrl,
  profilePhotoUploadCtrl,
  deleteUserProfileCtrl,
  getUserBalanceCtrl,
  chargeUserBalanceCtrl,
} = require("../controllers/userController");
const validateObjectId = require("../middlewares/validateObjectId");
const {
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
  VerifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const photoUpload = require("../middlewares/photoUpload");
// /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl);
// /api/users/count
router.route("/count").get(verifyTokenAndAdmin, getUsersCountCtrl);
// /api/users/balance
router
  .route("/balance/:id")
  .get(validateObjectId, verifyTokenAndAuthorization, getUserBalanceCtrl)
  .put(validateObjectId, verifyTokenAndAdmin, chargeUserBalanceCtrl);
// /api/users/profile/:id
router
  .route("/profile/:id")
  .get(validateObjectId, getUserProfileCtrl)
  .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl)
  .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtrl);
// /api/users/profile/upload-profile-photo
router
  .route("/profile/upload-profile-photo")
  .post(VerifyToken, photoUpload.single("image"), profilePhotoUploadCtrl);
module.exports = router;
