// routes/inputData.js
const express = require("express");
const router = express.Router();
const InputData = require("../models/InputData");

// Save input data
router.post("/", async (req, res) => {
  try {
    const newData = new InputData(req.body);
    await newData.save();
    res.status(201).json({ message: "Data saved", data: newData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all input data
router.get("/", async (req, res) => {
  try {
    const data = await InputData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
