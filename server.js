const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { auth } = require("express-oauth2-jwt-bearer");
const adminRouter = require("./routes/admin/adminRoutes");
const productsRouter = require("./routes/products/productRouter");
const port = process.env.PORT || 5000;
const notFound = require("./middleware/notFound.js");
require("dotenv").config({ path: "./config.env" });

// cors

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/admin/", adminRouter);
app.use("/api/product/", productsRouter);

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
