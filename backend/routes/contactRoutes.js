// backend/routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST – Save contact message
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, message: "Message received successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
