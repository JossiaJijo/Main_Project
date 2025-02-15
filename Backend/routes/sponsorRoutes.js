const express = require('express');
const Sponsorship = require('../models/Sponsorship');
const Proposal = require('../models/Proposal');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch all sponsors (Requires authentication)
router.get('/all-sponsors', protect, async (req, res) => {
    try {
      const sponsors = await User.find({ role: 'sponsor' }).select('username firstName lastName email contactNumber location');
      res.status(200).json(sponsors);
    } catch (error) {
      console.error('Error fetching sponsors:', error);
      res.status(500).json({ error: 'Failed to fetch sponsors.' });
    }
  });
  router.get('/stats/:id', protect, async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Count sponsorships added by the user
      const sponsorshipCount = await Sponsorship.countDocuments({ sponsorId: userId });
  
      // Count proposals submitted by the user (if they are a seeker)
      const submittedProposals = await Proposal.countDocuments({ seekerId: userId });
  
      // Count proposals received by the sponsor
      const receivedProposals = await Proposal.countDocuments({ sponsorshipId: { $in: await Sponsorship.find({ sponsorId: userId }).distinct('_id') } });
  
      // Count accepted and rejected proposals
      const acceptedProposals = await Proposal.countDocuments({ sponsorshipId: { $in: await Sponsorship.find({ sponsorId: userId }).distinct('_id') }, status: 'Accepted' });
      const rejectedProposals = await Proposal.countDocuments({ sponsorshipId: { $in: await Sponsorship.find({ sponsorId: userId }).distinct('_id') }, status: 'Rejected' });
  
      res.status(200).json({
        sponsorshipCount,
        submittedProposals,
        receivedProposals,
        acceptedProposals,
        rejectedProposals,
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      res.status(500).json({ error: 'Failed to fetch user stats.' });
    }
  });
  

module.exports = router;
