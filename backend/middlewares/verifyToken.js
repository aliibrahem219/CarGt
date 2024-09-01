const jwt = require("jsonwebtoken");

//Verify Token
function VerifyToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const decodedPatload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedPatload;
      next();
    } catch (error) {
      return res.status(401).json({ message: "invalid token , access denied" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "no token provided, access denied" });
  }
}
//Verify Token and Admin
function verifyTokenAndAdmin(req, res, next) {
  VerifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "not allowed , only admin" });
    }
  });
}
//Verify Token && Only himself
function verifyTokenAndOnlyUser(req, res, next) {
  VerifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json({ message: "not allowed , only user himself" });
    }
  });
}
//Verify Token && Authorization
function verifyTokenAndAuthorization(req, res, next) {
  VerifyToken(req, res, () => {
    if (req.user._id === req.params._id) {
      next();
    } else if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "not allowed , only user himself or admin" });
    }
  });
}
module.exports = {
  VerifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
  verifyTokenAndAuthorization,
};
