const asyncHandler = require("express-async-handler");
const {
  CarsCategory,
  validateCreateCarsCategory,
} = require("../models/CarsCategory");

/**----------------------------------------
 * @decs Create new CarsCategory
 * @route /api/cars-categories
 * @method POST
 * @access private (only admin)
 -----------------------------------------*/
module.exports.createCarsCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateCarsCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const carsCategory = await CarsCategory.create({
    title: req.body.title,
    user: req.user.id,
  });
  res.status(200).json(carsCategory);
});
/**----------------------------------------
 * @decs Get All CarsCategories
 * @route /api/cars-categories/count
 * @method GET
 * @access public (All users)
 -----------------------------------------*/
module.exports.getAllCarsCategoriesCtrl = asyncHandler(async (req, res) => {
  const carsCategories = await CarsCategory.find();
  res.status(200).json(carsCategories);
});
/**----------------------------------------
 * @decs Get All cars categories count
 * @route /api/cars-categories
 * @method GET
 * @access public (All users)
 -----------------------------------------*/
module.exports.getCarsCategoriesCountCtrl = asyncHandler(async (req, res) => {
  const carsCategoriesCount = await CarsCategory.countDocuments();
  res.status(200).json(carsCategoriesCount);
});
/**----------------------------------------
 * @decs Delete CarsCategory
 * @route /api/cars-categories/:id
 * @method DELETE
 * @access private (only admin)
 -----------------------------------------*/
module.exports.deleteCarsCategoryCtrl = asyncHandler(async (req, res) => {
  const carsCategory = await CarsCategory.findById(req.params.id);
  if (!carsCategory) {
    return res.status(404).json({ message: "Car Category not found" });
  }
  await CarsCategory.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Car Category has been deleted successfully",
    CarsCategoryId: carsCategory._id,
  });
});
