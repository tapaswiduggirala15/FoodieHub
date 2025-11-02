// backend/models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  transactionId: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Payment", paymentSchema);
