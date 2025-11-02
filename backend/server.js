
// ✅ FoodieHub Backend - Final Version (Connected to MongoDB Atlas)

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (Atlas)
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// ✅ Schemas
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  guests: Number,
});

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  items: String,
  address: String,
  date: { type: Date, default: Date.now },
});

const paymentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  method: String,
  date: { type: Date, default: Date.now },
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  rating: Number,
  date: { type: Date, default: Date.now },
});

// ✅ Models
const User = mongoose.model("User", userSchema);
const Reservation = mongoose.model("Reservation", reservationSchema);
const Order = mongoose.model("Order", orderSchema);
const Payment = mongoose.model("Payment", paymentSchema);
const Contact = mongoose.model("Contact", contactSchema);

// ✅ Default Route
app.get("/", (req, res) => res.send("🍴 FoodieHub Backend Running ✅"));

// ============================
// 🔹 AUTH ROUTES
// ============================

// ✅ Register
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.json({ success: true, message: "✅ User registered successfully!" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "2h" });

    res.json({
      success: true,
      message: `✅ Welcome back, ${user.username}!`,
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ============================
// 🔹 OTHER ROUTES
// ============================

// ✅ Reservation
app.post("/api/reservation", async (req, res) => {
  try {
    const data = new Reservation(req.body);
    await data.save();
    res.json({ success: true, message: "✅ Reservation saved successfully!" });
  } catch (err) {
    console.error("Reservation Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Orders
app.post("/api/orders", async (req, res) => {
  try {
    const data = new Order(req.body);
    await data.save();
    res.json({ success: true, message: "✅ Order placed successfully!" });
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Payment
app.post("/api/payment", async (req, res) => {
  try {
    const { name, phone, method } = req.body;

    if (!name || !phone || !method)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const newPayment = new Payment({ name, phone, method });
    await newPayment.save();

    res.json({ success: true, message: "✅ Payment successful!" });
  } catch (err) {
    console.error("Payment Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Contact
app.post("/api/contacts", async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const newContact = new Contact({ name, email, message, rating });
    await newContact.save();

    res.json({
      success: true,
      message: "✅ Contact form submitted successfully!",
    });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
https://foodiehub-frontend-9z90.onrender.comadd this link to this give
