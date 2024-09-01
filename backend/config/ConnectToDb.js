const mongoose = require("mongoose");
module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log("Connection Failed To MongoDb !", error);
  }
};
