const express = require("express");
const app = express();
const cors = require("cors");
// cors
app.use(cors());
app.use(express.json());

// config
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const stripe = require("stripe")(
  "sk_test_51KnkBkHFncMRcd3qBvG8iSJonPD2LvdKhuWkAfqhN5rigEt0bdPnUnmTDOOgnNUeB2wxJ35DYOwsRCjaNwYcpV9S001OHpMcNV"
);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

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
});

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
