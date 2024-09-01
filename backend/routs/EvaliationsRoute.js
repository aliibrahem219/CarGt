const router = require("express").Router();
const {
  createEvaliationCtrl,
  getAllEvaliationsCtrl,
  deleteEvaliationsCtrl,
  updateEvaliationCtrl,
  //updateRatingCtrl,
} = require("../controllers/evaliationController");
const {
  VerifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
// /api/evaliations
router
  .route("/")
  .post(VerifyToken, createEvaliationCtrl)
  .get(verifyTokenAndAdmin, getAllEvaliationsCtrl);
// /api/evaliations/:id
router
  .route("/:id")
  .delete(validateObjectId, VerifyToken, deleteEvaliationsCtrl)
  .put(validateObjectId, VerifyToken, updateEvaliationCtrl);

module.exports = router;
