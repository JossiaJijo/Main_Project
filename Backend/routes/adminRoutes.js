const express = require('express');
const { protect, adminAuth } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Sponsorship = require('../models/Sponsorship');

const router = express.Router();

// Get all users
router.get('/users', protect, adminAuth, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Get statistics
router.get('/stats', protect, adminAuth, async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalSponsorships = await Sponsorship.countDocuments();
  const totalProposals = await Proposal.countDocuments();
  res.json({ totalUsers, totalSponsorships, totalProposals });
});

// Ban/unban user
router.put('/users/ban/:id', protect, adminAuth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  
  user.isBanned = !user.isBanned;
  await user.save();
  res.json({ message: `User ${user.isBanned ? 'banned' : 'unbanned'}.` });
});

// Delete user
router.delete('/users/:id', protect, adminAuth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted successfully.' });
});

// Delete sponsorship
router.delete('/sponsorships/:id', protect, adminAuth, async (req, res) => {
  await Sponsorship.findByIdAndDelete(req.params.id);
  res.json({ message: 'Sponsorship deleted successfully.' });
});

module.exports = router;
