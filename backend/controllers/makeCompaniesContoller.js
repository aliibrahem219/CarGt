const asyncHandler = require("express-async-handler");
const {
  MakeCompanies,

  validateCreateMakeCompany,
} = require("../models/MakeCompanies");

/**----------------------------------------
 * @decs Create new MakeCompany
 * @route /api/make-companies
 * @method POST
 * @access private (only admin)
 -----------------------------------------*/
module.exports.createMakeCompaniesCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateMakeCompany(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const makeCompanies = await MakeCompanies.create({
    title: req.body.title,
    user: req.user.id,
  });
  res.status(200).json(makeCompanies);
});
/**----------------------------------------
 * @decs Get All make companies
 * @route /api/make-companies
 * @method GET
 * @access public (All users)
 -----------------------------------------*/
module.exports.getAllMakeCompaniesCtrl = asyncHandler(async (req, res) => {
  const makeCompanies = await MakeCompanies.find();
  res.status(200).json(makeCompanies);
});
/**----------------------------------------
 * @decs Get All make companies count
 * @route /api/make-companies/count
 * @method GET
 * @access public (All users)
 -----------------------------------------*/
module.exports.getAllMakeCompaniesCountCtrl = asyncHandler(async (req, res) => {
  const makeCompaniesCount = await MakeCompanies.countDocuments();
  res.status(200).json(makeCompaniesCount);
});
/**----------------------------------------
 * @decs Delete MakeCompanies
 * @route /api/make-companies/:id
 * @method DELETE
 * @access private (only admin)
 -----------------------------------------*/
module.exports.deleteMakeCompaniesCtrl = asyncHandler(async (req, res) => {
  const makeCompanies = await MakeCompanies.findById(req.params.id);
  if (!makeCompanies) {
    return res.status(404).json({ message: "Make Company not found" });
  }
  await MakeCompanies.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Make Company has been deleted successfully",
    makeCompaniesId: makeCompanies._id,
  });
});
