const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// get driver connection
const dbo = require("./db/conn");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
connectDB();

app.use(require("./routes/record"));
// app.all("*", (req, res) => {
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepts("json")) {
//     res.json({ error: "404 Not Found" });
//   } else {
//     res.type("txt").send("404 Not Found");
//   }
// });

mongoose.connection.once("open", () => {
  console.log(`Successfully connected to Mongoose.`);
  // perform a database connection when server starts
  // migrate to mongoose
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
