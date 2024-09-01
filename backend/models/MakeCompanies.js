const mongoose = require("mongoose");
const joi = require("joi");
//Category Schema
const MakeCompaniesSchema = new mongoose.Schema(
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

//MakeCompanies Model
const MakeCompanies = mongoose.model("MakeCompanies", MakeCompaniesSchema);
//Validate Create MakeCompany
function validateCreateMakeCompany(obj) {
  const schema = joi.object({
    title: joi.string().trim().required().label("Title"),
  });
  return schema.validate(obj);
}

module.exports = {
  MakeCompanies,
  validateCreateMakeCompany,
};
