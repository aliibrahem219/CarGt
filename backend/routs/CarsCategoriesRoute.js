const router = require("express").Router();
const {
  createCarsCategoryCtrl,
  getAllCarsCategoriesCtrl,
  deleteCarsCategoryCtrl,
  getCarsCategoriesCountCtrl,
} = require("../controllers/CarCategoriesController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
// /api/categories
router
  .route("/")
  .post(verifyTokenAndAdmin, createCarsCategoryCtrl)
  .get(getAllCarsCategoriesCtrl);
router.route("/count").get(getCarsCategoriesCountCtrl);
// /api/categories/:id
router
  .route("/:id")
  .delete(validateObjectId, verifyTokenAndAdmin, deleteCarsCategoryCtrl);
module.exports = router;
