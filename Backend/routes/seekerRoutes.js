const express = require('express');
const User = require('../models/User'); // Ensure you have a User model
const Proposal = require('../models/Proposal');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch all seekers
router.get('/all-seekers', protect, async (req, res) => {
    try {
      const seekers = await User.find({ role: 'seeker' }).select('username firstName lastName email contactNumber location');
      res.status(200).json(seekers);
    } catch (error) {
      console.error('Error fetching seekers:', error);
      res.status(500).json({ error: 'Failed to fetch seekers.' });
    }
  });
  // Fetch seeker statistics (proposals submitted, accepted, rejected)
router.get('/stats/:id', protect, async (req, res) => {
  try {
    const seekerId = req.params.id;

    // Count total proposals submitted by the seeker
    const submittedProposals = await Proposal.countDocuments({ seekerId });

    // Count accepted and rejected proposals
    const acceptedProposals = await Proposal.countDocuments({ seekerId, status: 'Accepted' });
    const rejectedProposals = await Proposal.countDocuments({ seekerId, status: 'Rejected' });

    res.status(200).json({
      submittedProposals,
      acceptedProposals,
      rejectedProposals,
    });
  } catch (error) {
    console.error('Error fetching seeker stats:', error);
    res.status(500).json({ error: 'Failed to fetch seeker statistics.' });
  }
});


module.exports = router;
