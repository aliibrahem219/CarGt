const { User } = require("../models/User");
module.exports.pay = async (userId, amount) => {
  const userBalance = await User.findById(userId, "balance");

  if (!userBalance || userBalance === 0) {
    return { message: "User don't have any balance" };
  }
  let newBalance;
  if (userBalance.balance >= amount) {
    newBalance = userBalance?.balance - amount;
  } else {
    return {
      message: "you don't have enough balance to make this operation",
    };
  }

  const newUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        balance: newBalance,
      },
    },
    { new: true }
  );

  return newUser;
};
