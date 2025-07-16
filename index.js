

const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from Firebase!",
  });
});




app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }

  }})

app.listen(5000, (error) => {
    if (error) throw error;
  console.log("Amazon Server is running on port 5000 , https://localhost:5000");
});