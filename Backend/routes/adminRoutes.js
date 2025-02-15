const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Sponsorship = require('../models/Sponsorship');

const router = express.Router();

// Middleware to check admin role
const checkAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

// Fetch all users (admin only)
router.get('/users', protect, checkAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Fetch all sponsorships (admin only)
router.get('/sponsorships', protect, checkAdmin, async (req, res) => {
  try {
    const sponsorships = await Sponsorship.find();
    res.status(200).json(sponsorships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sponsorships' });
  }
});

module.exports = router;
