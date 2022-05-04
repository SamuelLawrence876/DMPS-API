const express = require("express");
const app = express();
const cors = require("cors");
// cors
app.use(cors());
app.use(express.json());

// config
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

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
