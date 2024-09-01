const asyncHandler = require("express-async-handler");
const {
  Evaliation,
  validateCreateEvaliation,
  validateUpdateEvaliation,
} = require("../models/Evaliation");
const { User } = require("../models/User");
/**----------------------------------------
 * @decs Create new Evaliation
 * @route /api/evaliations
 * @method POST
 * @access private (only loggedin users)
 -----------------------------------------*/
module.exports.createEvaliationCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateEvaliation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findById(req.user.id);
  const profile = await User.findById(req.body.profileId, "customers");

  const isCustomerAlreadyBought = profile?.customers.find(
    (userId) => userId.toString() === user?.id
  );

  if (isCustomerAlreadyBought) {
    const evaliation = await Evaliation.create({
      profileId: req.body.profileId,
      text: req.body.text,
      rating: req.body.rating,
      user: req.user.id,
      username: user.username,
    });
    updateRatingCtrl(req.body.profileId);
    res.status(201).json(evaliation);
  } else {
    return res.status(400).json({
      message: "You should buy from this seller before evliation him",
    });
  }
});

/**----------------------------------------
 * @decs Get All Evaliations
 * @route /api/evaliations
 * @method GET
 * @access private (only admin)
 -----------------------------------------*/

module.exports.getAllEvaliationsCtrl = asyncHandler(async (req, res) => {
  const evaliations = await Evaliation.find().populate("user");
  res.status(200).json(evaliations);
});
/**----------------------------------------
 * @decs Delete Evaliation
 * @route /api/evaliations/:id
 * @method DELETE
 * @access private (only admin or owner of the evaliation)
 -----------------------------------------*/

module.exports.deleteEvaliationsCtrl = asyncHandler(async (req, res) => {
  const evaliation = await Evaliation.findById(req.params.id);
  const profileId = evaliation.profileId;
  if (!evaliation) {
    return res.status(404).json({ message: "Evaliation not found" });
  }
  if (req.user.isAdmin || req.user.id === evaliation.user.toString()) {
    await Evaliation.findByIdAndDelete(req.params.id);
    updateRatingCtrl(profileId);
    res.status(200).json({ message: "Evaliation has been deleted" });
  } else {
    res.status(403).json({ message: "access denied , not allowed" });
  }
});
/**----------------------------------------
 * @decs Update Evaliation
 * @route /api/evaliations/:id
 * @method PUT
 * @access private (only owner of the evaliation)
 -----------------------------------------*/

module.exports.updateEvaliationCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateEvaliation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const evaliation = await Evaliation.findById(req.params.id);
  const profileId = evaliation.profileId;
  if (!evaliation) {
    return res.status(404).json({ message: "evaliation not found" });
  }
  if (req.user.id !== evaliation.user.toString()) {
    res.status(403).json({
      message: "access denied , only user himself can update his evaliation",
    });
  }
  const updatedEvaliation = await Evaliation.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        text: req.body.text,
        rating: req.body.rating,
      },
    },
    { new: true }
  );
  updateRatingCtrl(profileId);
  res.status(200).json(updatedEvaliation);
});
/**----------------------------------------
 * @decs Update Rating
 -----------------------------------------*/

const updateRatingCtrl = asyncHandler(async (profileId) => {
  const evaliations = await Evaliation.find({
    profileId,
  });

  let sum = 0;
  evaliations.map((evaliation) => {
    sum += evaliation.rating;
  });
  let rating = 0;
  if (evaliations.length > 0) {
    rating = sum / evaliations.length;
  }

  await User.findByIdAndUpdate(
    profileId,
    {
      $set: {
        rating: rating,
      },
    },
    { new: true }
  );
});
