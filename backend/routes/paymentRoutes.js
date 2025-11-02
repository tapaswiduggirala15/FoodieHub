// backend/routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const Payment = require("../models/payment");

// POST – Save payment info
router.post("/", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json({ success: true, message: "Payment recorded successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
