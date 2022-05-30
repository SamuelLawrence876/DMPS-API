const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { auth } = require("express-oauth2-jwt-bearer");
const adminRouter = require("./routes/admin/adminRoutes");
const productsRouter = require("./routes/products/productRouter");
const userRouter = require("./routes/user/userRouter");
const authRouter = require("./routes/auth/authRouter");
const authenticateUser = require("./middleware/authentication");
const notFound = require("./middleware/notFound.js");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
require("dotenv").config({ path: "./config.env" });

// extra security packages

// const helmet = require('helmet');
// const cors = require('cors');
// const xss = require('xss-clean');
// const rateLimiter = require('express-rate-limit');

app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(bodyParser.json());

// routes
app.use("/api/auth/", authRouter);
app.use("/api/admin/", adminRouter);
app.use("/api/product/", productsRouter);
app.use("/api/user/", userRouter);

// middleware

app.use(notFound);
// config

// get driver connection
const dbo = require("./db/conn");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
connectDB();

app.use(require("./routes/record"));

mongoose.connection.once("open", () => {
  console.log(`Successfully connected to Mongoose.`);
  // perform a database connection when server starts
  // migrate to mongoose
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
