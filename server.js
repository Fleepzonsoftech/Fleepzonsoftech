require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors()); // allow frontend to call backend
app.use(bodyParser.json());

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order
app.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees
    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
      payment_capture: 1
    };
    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (err) {
    console.error("❌ Order creation failed:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Verify payment
app.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    res.json({ success: true, message: "✅ Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "❌ Payment verification failed" });
  }
});

// Start server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
