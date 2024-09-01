const { User } = require("../models/User");
module.exports.addCustomer = async (sallerId, customerId) => {
  let saller = await User.findById(sallerId);
  if (!saller) {
    return res.status(404).json({ message: "saller not found" });
  }

  const isCustomerAlreadyBought = saller.customers.find(
    (user) => user.toString() === customerId
  );

  if (!isCustomerAlreadyBought) {
    saller = await User.findByIdAndUpdate(
      sallerId,
      {
        $push: {
          customers: customerId,
        },
      },
      { new: true }
    );
  }
};
