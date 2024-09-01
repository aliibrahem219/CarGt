const router = require("express").Router();
const {
  createNotificationCtrl,
  getAllNotificationsCtrl,
  deleteNotificationsCtrl,
} = require("../controllers/notificationController");
const { VerifyToken } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
// /api/notification

router
  .route("/")
  .post(VerifyToken, createNotificationCtrl)
  .get(getAllNotificationsCtrl);
// /api/notification/:id
router
  .route("/:id")
  .delete(validateObjectId, VerifyToken, deleteNotificationsCtrl);
module.exports = router;
