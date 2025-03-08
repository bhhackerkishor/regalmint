const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
const Order = require("../models/Order.js");

dotenv.config();
const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order API
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // Razorpay uses paise (₹1 = 100 paise)
      currency: currency || "INR",
      receipt: `receipt_${Math.random() * 10000}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment order creation failed" });
  }
});

// Verify Payment API
router.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId, email } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      const order = await Order.findOne({ orderId: orderId }).populate("user", "name email");

      if (order) {
        order.paymentResult = {
          id: razorpay_payment_id,
          status: "Paid",
          update_time: new Date().toISOString(),
          email_address: email,
          transactionId: razorpay_order_id,
        };
        await order.save();
        res.json({ success: true, message: "Payment Verified Successfully" });
      } else {
        res.status(400).json({ success: false, message: "Payment Verification Failed" });
      }
    } else {
      res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in verification" });
  }
});

module.exports = router;
