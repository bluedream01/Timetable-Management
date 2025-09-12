const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Mock login (for hackathon prototype)
router.post('/login', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'User not found' });
  res.json({ user });
});

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
