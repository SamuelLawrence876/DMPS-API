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
const mongooose = require("mongoose");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51KUeHwIziYistER0nhmIolZovsBbsJeBxY4rocHCoD5h9uuDW8aretS3q7DWwjpwmOrZGswnWL0u4pSBR0obghZZ000jd7ryPC"
);
const adminRoutes = require("./routes/admin");

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 75700;
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

mongooose.connect(
  Db,
  () => {
    console.log("mongoose connected");
  },
  (e) => console.log(e)
);

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
