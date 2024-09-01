const router = require("express").Router();
const {
  createOfferCtrl,
  getAllOffersCtrl,
  getAllOffersAdminCtrl,
  getOffersCountCtrl,
  getSingleOfferCtrl,
  deleteOfferCtrl,
  updateOfferCtrl,
  viewsCtrl,
  highlightedCtrl,
  topCtrl,
  acceptOfferCtrl,
  updateOfferImageCtrl,
  getAllOffersSearchCtrl,
  addCustomerCtrl,
  bookingCtrl,
} = require("../controllers/offerController");
const photoUpload = require("../middlewares/photoUpload");
const {
  VerifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
// /api/offer
router
  .route("/")
  .post(VerifyToken, photoUpload.array("images", 10), createOfferCtrl)
  .get(getAllOffersCtrl)
  .get(verifyTokenAndAdmin, getAllOffersAdminCtrl);
// /api/offer
router.route("/admin").get(verifyTokenAndAdmin, getAllOffersAdminCtrl);
router.route("/count").get(getOffersCountCtrl);
// /api/offer/search
router.route("/search").get(getAllOffersSearchCtrl);
// /api/offer/:id
router
  .route("/:id")
  .get(validateObjectId, getSingleOfferCtrl)
  .delete(validateObjectId, verifyTokenAndAuthorization, deleteOfferCtrl)
  .put(validateObjectId, VerifyToken, updateOfferCtrl);
// /api/offer/accept/:id
router
  .route("/accept/:id")
  .put(validateObjectId, verifyTokenAndAdmin, acceptOfferCtrl);
// /api/offer/update-image/:id

router
  .route("/update-image/:id")
  .put(
    validateObjectId,
    VerifyToken,
    photoUpload.array("images", 10),
    updateOfferImageCtrl
  );
// /api/pffer/view/:id
router.route("/view/:id").put(validateObjectId, VerifyToken, viewsCtrl);
router
  .route("/highlighted/:id")
  .put(validateObjectId, verifyTokenAndAuthorization, highlightedCtrl);
router
  .route("/top/:id")
  .put(validateObjectId, verifyTokenAndAuthorization, topCtrl);
// /api/offer/addCustomer/:id
router.route("/booking/:id").put(validateObjectId, VerifyToken, bookingCtrl);
module.exports = router;
