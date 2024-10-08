const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");
const { VerificationToken } = require("../models/verifecationToken");
const { notification } = require("../middlewares/notificaion");
/**----------------------------------------
 * @decs Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 -----------------------------------------*/
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  let phoneNumber = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (user || phoneNumber) {
    return res.status(400).json({ message: "user already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: hashedPassword,
  });
  await user.save();

  const verificationToken = new VerificationToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await verificationToken.save();

  const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

  const htmlTemplate = `
  <div>
  <p>Click on the link to verify your email</p>
  <a href=${link}>Verify</a>
  </div>
  `;

  await sendEmail(user.email, "Verify your email", htmlTemplate);

  res
    .status(201)
    .json({ message: "we sent you an email please verify your email address" });
});
/**----------------------------------------
 * @decs login User
 * @route /api/auth/login
 * @method POST
 * @access public
 -----------------------------------------*/
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  if (!user.isAccountVerified) {
    let verificationToken = await VerificationToken.findOne({
      userId: user._id,
    });
    if (!verificationToken) {
      verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await verificationToken.save();
    }

    const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

    const htmlTemplate = `
  <div>
  <p>Click on the link to verify your email</p>
  <a href=${link}>Verify</a>
  </div>
  `;

    await sendEmail(user.email, "Verify your email", htmlTemplate);
    return res.status(400).json({
      message: "we sent you an email please verify your email address",
    });
  }

  const token = user.generateAuthToken();

  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
    username: user.username,
  });
});
/**----------------------------------------
 * @decs Verify User Account
 * @route /api/auth/:userId/verify/:token
 * @method GET
 * @access public
 -----------------------------------------*/
module.exports.verifyUserAccountCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(400).json({ message: "Invalid link" });
  }
  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid link" });
  }
  user.isAccountVerified = true;
  await user.save();

  await VerificationToken.findByIdAndDelete(verificationToken._id);
  await notification({
    title: `welcome to carGt you can see your profile`,
    link: `/profile/${user._id.toString()}`,
    userId: user._id.toString(),
  });
  res.status(200).json({ message: "Your account verified" });
});
