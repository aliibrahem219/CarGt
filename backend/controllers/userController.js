const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const bycript = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryRemoveMultipleImage,
} = require("../utils/cloudinary");
const { Comment } = require("../models/Comments");
const { Post } = require("../models/Post");
const { Offer } = require("../models/Offer");
const { Evaliation } = require("../models/Evaliation");
const { Notification } = require("../models/Notification");
/**----------------------------------------
 * @decs Get All Users Profile
 * @route /api/users/profile
 * @method GET
 * @access private (only admin)
 -----------------------------------------*/
module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("posts");
  res.status(200).json(users);
});
/**----------------------------------------
 * @decs Get User Profile
 * @route /api/users/profile/:id
 * @method GET
 * @access public
 -----------------------------------------*/
module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("posts")
    .populate("offers")
    .populate("evaliations")
    .populate("notifications");
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});
/**----------------------------------------
 * @decs Update User Profile
 * @route /api/users/profile/:id
 * @method PUT
 * @access private (only user himself)
 -----------------------------------------*/
module.exports.updateUserProfileCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  if (req.body.password) {
    const salt = await bycript.genSalt(10);
    req.body.password = await bycript.hash(req.body.password, salt);
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
        phoneNumber: req.body.phoneNumber,
      },
    },
    { new: true }
  )
    .select("-password")
    .populate("posts")
    .populate("offers")
    .populate("evaliations");
  res.status(200).json(updatedUser);
});
/**----------------------------------------
 * @decs Get All Users Count
 * @route /api/users/count
 * @method GET
 * @access private (only admin)
 -----------------------------------------*/
module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
  const count = await User.estimatedDocumentCount({});
  res.status(200).json(count);
});
/**----------------------------------------
 * @decs Profile Photo Upload
 * @route /api/users/profile/upload-profile-photo 
 * @method POST
 * @access private (only logged in user)
 -----------------------------------------*/
module.exports.profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "no file provided" });
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  const result = await cloudinaryUploadImage(imagePath);

  const user = await User.findById(req.user.id);

  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();

  res.status(200).json({
    message: "Your Profile Photo Uploaded successfully !",
    profilePhoto: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  fs.unlinkSync(imagePath);
});
/**----------------------------------------
 * @decs Delete User Profile (Account)
 * @route /api/users/profile/:id
 * @method DELETE
 * @access private (only admin or user himself)
 -----------------------------------------*/
module.exports.deleteUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const posts = await Post.find({ user: user._id });
  const offers = await Offer.find({ user: user._id });

  const postsPublicIds = posts?.map((post) => post.image.publicId);
  const offersPublicIds = offers?.map((offer) =>
    offer.images.map((image) => image.publicId)
  );

  if (postsPublicIds?.length > 0) {
    await cloudinaryRemoveMultipleImage(postsPublicIds);
  }
  if (offersPublicIds?.length > 0) {
    await cloudinaryRemoveMultipleImage(offersPublicIds);
  }

  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  await Post.deleteMany({ user: user._id });
  await Comment.deleteMany({ user: user._id });
  await Offer.deleteMany({ user: user._id });
  await Evaliation.deleteMany({ user: user._id });
  await Notification.deleteMany({ userId: user._id });

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Your profile has been deleted " });
});
/**----------------------------------------
 * @decs Get User Balance
 * @route /api/users/balance/:id
 * @method GET
 * @access private (only admin or user himself)
 -----------------------------------------*/
module.exports.getUserBalanceCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  const balance = await User.findById(user._id, "balance");
  if (!balance) {
    return { message: "User don't have any balance" };
  }
  res.status(200).json(balance);
});
/**----------------------------------------
 * @decs Get User Balance
 * @route /api/users/balance/:id
 * @method GET
 * @access private (only admin or user himself)
 -----------------------------------------*/
module.exports.chargeUserBalanceCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  const amount = req.body.amount;

  if (!amount || amount < 0) {
    res.status(401).json({ message: "this amount is not valid try again" });
  }
  const newBalance = user?.balance + parseInt(amount);
  const newUserBalance = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        balance: newBalance,
      },
    },
    { new: true }
  );
  res.status(200).json(newUserBalance);
});
