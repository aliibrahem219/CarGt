const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { User, validateEmail, validateNewPassword } = require("../models/User");
const { VerificationToken } = require("../models/verifecationToken");

/**----------------------------------------
 * @decs Send Reset Password Link
 * @route /api/password/reset-password-link
 * @method POST
 * @access public
 -----------------------------------------*/
module.exports.sendResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
  const { error } = validateEmail(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "User with given email does not exist!" });
  }

  let verificationToken = await VerificationToken.findOne({ userId: user._id });
  if (!verificationToken) {
    verificationToken = new VerificationToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await verificationToken.save();
  }

  const link = `${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${verificationToken.token}`;

  const htmlTemplate = `<a href=${link}>Click her to reset your password</a>`;

  await sendEmail(user.email, "Reset Password", htmlTemplate);

  res.status(200).json({
    message: "Password reset link sent to your email, pLease check your email",
  });
});

/**----------------------------------------
 * @decs Get Reset Password Link
 * @route /api/password/reset-password/:userId/:token
 * @method GET 
 * @access public
 -----------------------------------------*/
module.exports.getResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(400).json({ message: "Invalid Link" });
  }
  const verifecationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verifecationToken) {
    return res.status(400).json({ message: "Invalid Link" });
  }

  res.status(200).json({ message: "valid url" });
});
/**----------------------------------------
 * @decs Reset Password
 * @route /api/password/reset-password/:userId/:token
 * @method POST
 * @access public
 -----------------------------------------*/
module.exports.resetPasswordCtrl = asyncHandler(async (req, res) => {
  const { error } = validateNewPassword(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(400).json({ message: "invalid link" });
  }
  const verifecationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verifecationToken) {
    return res.status(400).json({ message: "Invalid Link" });
  }
  if (!user.isAccountVerified) {
    user.isAccountVerified = true;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPassword;
  await user.save();

  await VerificationToken.findByIdAndDelete(verifecationToken._id);
  res.status(200).json({ message: "password reset successfully please login" });
});
