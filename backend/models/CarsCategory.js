const mongoose = require("mongoose");
const joi = require("joi");
//CarsCategory Schema
const CarsCategorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

//CarsCategory Model
const CarsCategory = mongoose.model("CarsCategory", CarsCategorySchema);
//Validate Create CarsCategory
function validateCreateCarsCategory(obj) {
  const schema = joi.object({
    title: joi.string().trim().required().label("Title"),
  });
  return schema.validate(obj);
}

module.exports = {
  CarsCategory,
  validateCreateCarsCategory,
};
