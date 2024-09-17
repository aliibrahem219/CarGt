const fs = require("fs");
const path = require("path");

const asyncHandler = require("express-async-handler");
const {
  Offer,
  validateCreateOffer,
  validateUpdateOffer,
} = require("../models/Offer");
const { User } = require("../models/User");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const { pay } = require("../middlewares/pay");
const { notification } = require("../middlewares/notificaion");
const { addCustomer } = require("../middlewares/addCustomer");
/**----------------------------------------
 * @decs Create new offer
 * @route /api/offer
 * @method POST
 * @access private (only loggedin users)
 -----------------------------------------*/
module.exports.createOfferCtrl = asyncHandler(async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "no image provided" });
  }

  const { error } = validateCreateOffer(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const uploadResults = [];
  for (const image of req.files) {
    const imagePath = path.join(__dirname, `../images/${image.filename}`);
    try {
      const result = await cloudinaryUploadImage(imagePath);
      uploadResults.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
      fs.unlinkSync(imagePath);
    } catch (error) {
      return res.status(500).json({ message: "Error uploading image" });
    }
  }

  const user = await User.findById(req.user.id);

  const offer = await Offer.create({
    carName: req.body.carName,
    make: req.body.make,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    images: uploadResults,
    color: req.body.color,
    year: req.body.year,
    distance: req.body.distance,
    city: req.body.city,
    fualType: req.body.fualType,
    gearbox: req.body.gearbox,
    ABS: req.body.ABS,
    cdPlayer: req.body.cdPlayer,
    electricWindows: req.body.electricWindows,
    fogLamp: req.body.fogLamp,
    sunRoof: req.body.sunRoof,
    centralLocking: req.body.centralLocking,
    price: req.body.price,
    isAccepted: user.isAdmin ? true : false,
  });

  res.status(201).json(offer);
});
/**----------------------------------------
 * @decs Get All offers
 * @route /api/offer
 * @method GET
 * @access public
 -----------------------------------------*/

module.exports.getAllOffersCtrl = asyncHandler(async (req, res) => {
  const OFFER_PER_PAGE = 4;
  const { pageNumber, category, userId, makingCompany } = req.query;
  let offers;
  if (pageNumber) {
    offers = await Offer.find({ isAccepted: true })
      .skip((pageNumber - 1) * OFFER_PER_PAGE)
      .limit(OFFER_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else if (userId) {
    offers = await Offer.find({ isAccepted: false, user: userId })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else if (category) {
    offers = await Offer.find({ isAccepted: true, category: category })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else if (makingCompany) {
    offers = await Offer.find({ isAccepted: true, make: makingCompany })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else {
    offers = await Offer.find({ isAccepted: true })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }
  res.status(200).json(offers);
});
/**----------------------------------------
 * @decs Get All offers
 * @route /api/offer/search
 * @method GET
 * @access public
 -----------------------------------------*/
module.exports.getAllOffersSearchCtrl = asyncHandler(async (req, res) => {
  let fualType = req.query.fualType;
  if (fualType === undefined || fualType === "all-fual") {
    fualType = { $in: ["gasoline", "diesel"] };
  }
  let gearbox = req.query.gearbox;
  if (gearbox === undefined || gearbox === "all-gear") {
    gearbox = { $in: ["gear", "automatic"] };
  }
  let category = req.query.category || "";
  let make = req.query.make || "";
  let color = req.query.color || "";
  let city = req.query.city || "";
  let year = req.query.year || 1990;
  let price_from = req.query.price_from || 20000000;

  let carName = req.query.carName || "";

  const offers = await Offer.find({
    carName: { $regex: carName, $options: "i" },
    category: { $regex: category, $options: "i" },
    make: { $regex: make, $options: "i" },
    color: { $regex: color, $options: "i" },
    city: { $regex: city, $options: "i" },
    gearbox,
    fualType,
    isAccepted: true,
    price: {
      $gte: parseInt(price_from),
    },
    year: { $gte: year },
  });

  return res.status(200).json(offers);
});
/**----------------------------------------
 * @decs Get All offers
 * @route /api/offer/admin
 * @method GET
 * @access public
 -----------------------------------------*/

module.exports.getAllOffersAdminCtrl = asyncHandler(async (req, res) => {
  let offers;

  offers = await Offer.find({ isAccepted: false })

    .sort({ createdAt: -1 })
    .populate("user", ["-password"]);

  res.status(200).json(offers);
});
/**----------------------------------------
 * @decs Get Single offer
 * @route /api/offer/:id
 * @method GET
 * @access public
 -----------------------------------------*/
module.exports.getSingleOfferCtrl = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id).populate("user", [
    "-password",
  ]);
  if (!offer) {
    return res.status(404).json({ message: "Offer Not Found" });
  }
  res.status(200).json(offer);
});
/**----------------------------------------
 * @decs Get Offers Count
 * @route /api/offer/count
 * @method GET
 * @access public
 -----------------------------------------*/
module.exports.getOffersCountCtrl = asyncHandler(async (req, res) => {
  const userId = req.query.userId;

  let offersCount;
  if (userId) {
    offersCount = await Offer.countDocuments({
      isAccepted: true,
      user: userId,
    });
  } else {
    offersCount = await Offer.countDocuments({ isAccepted: true });
  }
  res.status(200).json(offersCount);
});

/**----------------------------------------
 * @decs delete offer
 * @route /api/offer/:id
 * @method DELETE
 * @access private (only admin or owner of the offer)
 -----------------------------------------*/
module.exports.deleteOfferCtrl = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return res.status(404).json({ message: "offer Not Found" });
  }

  if (req.user.isAdmin || req.user.id === offer.user.toString()) {
    await Offer.findByIdAndDelete(req.params.id);
    for (let i = 0; i < offer?.images.length; i++) {
      await cloudinaryRemoveImage(offer.images[i].publicId);
    }

    res.status(200).json({
      message: "offer has been deleted successfuly",
      offerId: offer._id,
    });
  } else {
    res.status(403).json({ message: "Access denied , forbidden" });
  }
});
/**----------------------------------------
 * @decs accept offer
 * @route /api/offer/accept/:id
 * @method PUT
 * @access private (only admin )
 -----------------------------------------*/
module.exports.acceptOfferCtrl = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id);

  if (!offer) {
    return res.status(404).json({ message: "offer Not Found" });
  }

  const userOffer = await User.findById(offer.user);

  if (!userOffer?.isAdmin) {
    const balance = userOffer?.balance;
    if (balance < 200) {
      notification({
        title: "You don't have enough balance to make your offer accepted",
        link: "/about-us",
        userId: offer.user.toString(),
      });
      return res
        .status(401)
        .json({ message: "User Doesn't have enough balance" });
    } else {
      const newUser = await pay(userOffer?._id, 200);
      if (!newUser) {
        return res
          .status(401)
          .json({ message: "there is a problem in payment" });
      }
      notification({
        title: "your offer is accepted",
        link: "/offers",
        userId: offer.user.toString(),
      });
      userOffer?.customers?.map((customer) => {
        notification({
          title: `${userOffer.username} create a new offer`,
          link: `/offers/details/${offer?._id}`,
          userId: customer.toString(),
        });
      });
    }
  }
  if (req.user.isAdmin) {
    await Offer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          isAccepted: true,
        },
      },
      { new: true }
    );
  } else {
    res.status(403).json({ message: "Access denied , forbidden" });
  }
});
/**----------------------------------------
 * @decs Update offer
 * @route /api/offer/:id
 * @method PUT
 * @access private (only owner of the offer)
 -----------------------------------------*/
module.exports.updateOfferCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateOffer();
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return res.status(404).json({ message: "offer not found" });
  }

  if (req.user.id !== offer.user.toString()) {
    return res
      .status(403)
      .json({ message: "access denied,you are not allowed" });
  }

  const updatedOffer = await Offer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        carName: req.body.carName,
        make: req.body.make,
        fualType: req.body.fualType,
        description: req.body.description,
        category: req.body.category,
        color: req.body.color,
        year: req.body.year,
        distance: req.body.distance,
        city: req.body.city,
        gearbox: req.body.gearbox,
        ABS: req.body.ABS,
        cdPlayer: req.body.cdPlayer,
        electricWindows: req.body.electricWindows,
        fogLamp: req.body.fogLamp,
        sunRoof: req.body.sunRoof,
        centralLocking: req.body.centralLocking,
        price: req.body.price,
        top: req.body.top,
        hightlighting: req.body.hightlighting,
      },
    },
    { new: true }
  ).populate("user", ["-password"]);

  res.status(200).json(updatedOffer);
});
/**----------------------------------------
 * @decs Update offer Image
 * @route /api/offer/update-image/:id
 * @method PUT
 * @access private (only owner of the offer)
 -----------------------------------------*/
module.exports.updateOfferImageCtrl = asyncHandler(async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "no image provided" });
  }

  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return res.status(404).json({ message: "offer not found" });
  }

  if (req.user.id !== offer.user.toString()) {
    return res
      .status(403)
      .json({ message: "access denied,you are not allowed" });
  }

  for (let i = 0; i < offer?.images.length; i++) {
    await cloudinaryRemoveImage(offer.images[i].publicId);
  }

  const uploadResults = [];
  for (const image of req.files) {
    const imagePath = path.join(__dirname, `../images/${image.filename}`);
    try {
      const result = await cloudinaryUploadImage(imagePath);
      uploadResults.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
      fs.unlinkSync(imagePath);
    } catch (error) {
      return res.status(500).json({ message: "Error uploading image" });
    }
  }

  const updatedOffer = await Offer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        images: uploadResults,
      },
    },
    { new: true }
  );

  res.status(200).json(updatedOffer);
});
/**----------------------------------------
 * @decs Toggle view
 * @route /api/offer/view/:id
 * @method PUT
 * @access private (only logged in users)
 -----------------------------------------*/
module.exports.viewsCtrl = asyncHandler(async (req, res) => {
  const loggedInUser = req.user.id;
  const { id: offerId } = req.params;
  let offer = await Offer.findById(offerId);
  if (!offer) {
    return res.status(404).json({ message: "offer not found" });
  }

  const isOfferAlreadyViewed = offer.views.find(
    (user) => user.toString() === loggedInUser
  );
  const isOfferOwner = offer?.user.toString() === loggedInUser ? true : false;
  const isAdmin = loggedInUser.isAdmin;
  if (!isOfferAlreadyViewed && !isOfferOwner && !isAdmin) {
    offer = await Offer.findByIdAndUpdate(
      offerId,
      {
        $push: {
          views: loggedInUser,
        },
      },
      { new: true }
    );
  }
  res.status(200).json(offer);
});
/**----------------------------------------
 * @decs Hightlighted
 * @route /api/offer/highlted/:id
 * @method PUT
 * @access private (only admin and user himself)
 -----------------------------------------*/
module.exports.highlightedCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateOffer();
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return res.status(404).json({ message: "offer not found" });
  }
  if (offer.top === 2) {
    return res
      .status(403)
      .json({ message: "not allowed to offer to be top and highlighted" });
  }
  const user = await User.findById(offer.user._id);
  let updatedOffer;
  if (
    user?.isAdmin &&
    (req.body.hightlighting === 1 || req.body.hightlighting === 2)
  ) {
    updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          hightlighting: 2,
        },
      },
      { new: true }
    );
  } else if (req.user.isAdmin && req.body.hightlighting === 0) {
    updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          hightlighting: 0,
        },
      },
      { new: true }
    );
  } else if (!user.isAdmin && req.body.hightlighting === 2) {
    const balance = user.balance;
    if (balance < 100) {
      await notification({
        title: `you don't have enough balance to convert your offer to highlighting please contact with admin to recharge your balance`,
        link: `/about-us`,
        userId: offer.user._id.toString(),
      });
      return res
        .status(401)
        .json({ message: "User don't have enough balance" });
    }
    const newUser = await pay(user?._id, 100);
    if (!newUser) {
      return res.status(401).json({ message: "there is a problem in payment" });
    }
    updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          hightlighting: req.body.hightlighting,
        },
      },
      { new: true }
    );
  } else if (
    !user.isAdmin &&
    user._id.toString() === req.user.id &&
    req.body.hightlighting === 1
  ) {
    updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          hightlighting: req.body.hightlighting,
        },
      },
      { new: true }
    );
  } else {
    res.status(401).json({
      message: "not allowed check if is allow for you to make this operation",
    });
  }
  await notification({
    title: `your offer ${
      updatedOffer.hightlighting === 2
        ? "become highlighted"
        : updatedOffer.hightlighting === 0
        ? "become unhighlighted"
        : "is wating the accepting of admin"
    }`,
    link: "/offers",
    userId: offer.user._id.toString(),
  });

  res.status(200).json(updatedOffer);
});
/**----------------------------------------
 * @decs Top
 * @route /api/offer/top/:id
 * @method PUT
 * @access private (only admin and user himself)
 -----------------------------------------*/
module.exports.topCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateOffer();
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return res.status(404).json({ message: "offer not found" });
  }
  if (offer.hightlighting === 2) {
    return res
      .status(403)
      .json({ message: "not allowed to offer to be top and highlighted" });
  }
  const user = await User.findById(offer.user._id);

  let updatedOffer;
  if (user?.isAdmin && (req.body.top === 1 || req.body.top === 2)) {
    updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          top: 2,
        },
      },
      { new: true }
    );
  } else if (!user.isAdmin && req.body.top === 2) {
    const balance = user.balance;
    if (balance < 100) {
      await notification({
        title: `you don't have enough balance to convert your offer to top please contact with admin to recharge your balance`,
        link: `/about-us`,
        userId: offer.user._id.toString(),
      });
      return res
        .status(401)
        .json({ message: "User don't have enough balance" });
    }
    const newUser = await pay(user?._id, 100);
    if (!newUser) {
      return res.status(401).json({ message: "there is a problem in payment" });
    }
    updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          top: req.body.top,
        },
      },
      { new: true }
    );
  } else if (req.user.isAdmin && req.body.top === 0) {
    updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          top: req.body.top,
        },
      },
      { new: true }
    );
    await notification({
      title: `your offer don't have the standared of top cars so we reject to become top`,
      link: `/offers/details/${offer._id}`,
      userId: offer.user._id.toString(),
    });
  } else if (
    !user.isAdmin &&
    user._id.toString() === req.user.id &&
    req.body.top === 1
  ) {
    updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          top: req.body.top,
        },
      },
      { new: true }
    );
  } else {
    res.status(401).json({
      message: "not allowed check if is allow for you to make this operation",
    });
  }
  await notification({
    title: `your offer ${
      updatedOffer.top === 2
        ? "become top"
        : updatedOffer.top === 0
        ? "become untop"
        : "is wating the accepting of admin"
    }`,
    link: "/offers",
    userId: offer.user._id.toString(),
  });

  res.status(200).json(updatedOffer);
});
/**----------------------------------------
 * @decs Booking Offer
 * @route /api/offer/booking/:id
 * @method PUT
 * @access private (only logged in users)
 -----------------------------------------*/
module.exports.bookingCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateOffer();
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return res.status(404).json({ message: "offer not found" });
  }

  if (offer.booking.value === 2 && req.body.booking === 1) {
    return res
      .status(403)
      .json({ message: "not allowed to offer to be booking from two users" });
  }
  const saller = await User.findById(offer.user._id);
  const user = await User.findById(req.user.id);

  let updatedOffer;
  if (
    saller.id.toString() === user.id.toString() &&
    (req.body.booking === 2 || req.body.booking === 0)
  ) {
    updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "booking.value": req.body.booking,
        },
      },
      { new: true }
    );
    await addCustomer(saller.id, offer.booking.user);
    await notification({
      title: `${saller.username} ${
        req.body.booking === 2 ? "accepted" : "rejected"
      } booking his offer`,
      link: `/offers/details/${offer._id}`,
      userId: offer.booking.user,
    });
  } else if (
    saller.id.toString() !== user.id.toString() &&
    req.body.booking === 1
  ) {
    updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          booking: {
            value: req.body.booking,
            user: user.id,
            username: user.username,
          },
        },
      },
      { new: true }
    );
    await notification({
      title: `${user.username} want booking your offer`,
      link: `/offers/details/${offer._id}`,
      userId: saller.id.toString(),
    });
  } else {
    res.status(401).json({
      message: "not allowed check if is allow for you to make this operation",
    });
  }

  res.status(200).json(updatedOffer);
});
