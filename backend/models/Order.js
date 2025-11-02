const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  item: String,
  quantity: Number
});

module.exports = mongoose.model("Order", orderSchema);
