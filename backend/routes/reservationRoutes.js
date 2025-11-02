const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");

router.post("/", async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.json({ success: true, message: "Reservation submitted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving reservation" });
  }
});

module.exports = router;
