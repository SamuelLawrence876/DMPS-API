const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
const Db = process.env.ATLAS_URI;
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51KUeHwIziYistER0nhmIolZovsBbsJeBxY4rocHCoD5h9uuDW8aretS3q7DWwjpwmOrZGswnWL0u4pSBR0obghZZ000jd7ryPC"
);
const adminRoutes = require("./routes/admin");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");

connectDB();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(express.json());

//middleware for cookies
app.use(cookieParser());
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/api/users"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 50000;
};

app.use(adminRoutes);

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  console.log("Payment Made");
});

app.use(errorHandler);

// mongooose.connect(
//   Db,
//   () => {
//     console.log("mongoose connected");
//   },
//   (e) => console.log(e)
// );

mongoose.connection.once("open", () => {
  console.log(`Successfully connected to Mongoose.`);
  // perform a database connection when server starts
  // migrate to mongoose
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
//   });
//   console.log(`Server is running on port: ${port}`);
// });
