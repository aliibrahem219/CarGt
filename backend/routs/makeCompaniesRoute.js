const router = require("express").Router();
const {
  createMakeCompaniesCtrl,
  getAllMakeCompaniesCtrl,
  deleteMakeCompaniesCtrl,
  getAllMakeCompaniesCountCtrl,
} = require("../controllers/makeCompaniesContoller");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
// /api/make-companies
router
  .route("/")
  .post(verifyTokenAndAdmin, createMakeCompaniesCtrl)
  .get(getAllMakeCompaniesCtrl);

// /api/make-companies/count
router.route("/count").get(getAllMakeCompaniesCountCtrl);
// /api/make-companies/:id
router
  .route("/:id")
  .delete(validateObjectId, verifyTokenAndAdmin, deleteMakeCompaniesCtrl);
module.exports = router;
