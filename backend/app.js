const express = require("express");
const connectionToDb = require("./config/ConnectToDb");
const { errorHandler, notFound } = require("./middlewares/error");
const xss = require("xss-clean");
const helmet = require("helmet");
const hpp = require("hpp");
const rateLimiting = require("express-rate-limit");

const cors = require("cors");
require("dotenv").config();
//Connection to Db
connectionToDb();
//Init app
const app = express();

//MiddleWares
app.use(express.json());
//Security Headers (helmet)
app.use(helmet()); // this add some security headers to the request
//Prevent http params pollution
app.use(hpp());
//Prevent XSS (Cross Site Scripting) attacks
app.use(xss());
//Rate Limiting
app.use(
  rateLimiting({
    // this middleware allows to user to do 200 requests per 10 minutes
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200,
  })
);
// Cors Policy

app.use(cors());
//Routes
app.use("/api/auth", require("./routs/authRoute"));
app.use("/api/users", require("./routs/userRoute"));
app.use("/api/post", require("./routs/postRoute"));
app.use("/api/offer", require("./routs/offerRoute"));
app.use("/api/comments", require("./routs/commentsRoute"));
app.use("/api/evaliations", require("./routs/EvaliationsRoute"));
app.use("/api/categories", require("./routs/CategoriesRoute"));
app.use("/api/password", require("./routs/passwordRoute"));
app.use("/api/make-companies", require("./routs/makeCompaniesRoute"));
app.use("/api/cars-categories", require("./routs/CarsCategoriesRoute"));
app.use("/api/notification", require("./routs/notificationRoute"));
//Not Found Handler
app.use(notFound);
//Error Handler Middleware
app.use(errorHandler);
//Running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
