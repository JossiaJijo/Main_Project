const express = require('express');
const Proposal = require('../models/Proposal');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Accept Proposal and Notify Seeker
router.put('/accept/:id', protect, async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id).populate('sponsorshipId');
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found.' });
    }

    proposal.status = 'Accepted';
    proposal.messageToSeeker = `Your proposal for sponsorship "${proposal.sponsorshipId.title}" has been accepted.`;
    await proposal.save();

    res.status(200).json({ message: 'Proposal accepted successfully.', proposal });
  } catch (error) {
    console.error('Error accepting proposal:', error);
    res.status(500).json({ error: 'Failed to accept proposal.' });
  }
});

// Dismiss Proposal and Notify Seeker
router.put('/dismiss/:id', protect, async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id).populate('sponsorshipId');
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found.' });
    }

    proposal.status = 'Dismissed';
    proposal.messageToSeeker = `Your proposal for sponsorship "${proposal.sponsorshipId.title}" has been dismissed.`;
    await proposal.save();

    res.status(200).json({ message: 'Proposal dismissed successfully.', proposal });
  } catch (error) {
    console.error('Error dismissing proposal:', error);
    res.status(500).json({ error: 'Failed to dismiss proposal.' });
  }
});

// Fetch proposals submitted by the seeker
router.get('/seeker-submissions', protect, async (req, res) => {
  try {
    const seekerId = req.user.id;
    const proposals = await Proposal.find({ seekerId })
      .populate({
        path: 'sponsorshipId',
        select: 'title description deadline sponsorId',
        populate: {
          path: 'sponsorId',
          select: 'firstName lastName email contactNumber',
        },
      });

    const submissions = proposals.map((proposal) => ({
      id: proposal._id,
      sponsorshipTitle: proposal.sponsorshipId?.title || 'Unknown Sponsorship',
      description: proposal.sponsorshipId?.description || 'No description provided.',
      deadline: proposal.sponsorshipId?.deadline ? new Date(proposal.sponsorshipId.deadline).toLocaleDateString() : 'No deadline provided.',
      status: proposal.status,
      messageToSeeker: proposal.messageToSeeker || 'No message from sponsor.',
      createdAt: proposal.createdAt,
      sponsorDetails:
        proposal.status === 'Accepted' && proposal.sponsorshipId?.sponsorId
          ? {
              name: `${proposal.sponsorshipId.sponsorId.firstName} ${proposal.sponsorshipId.sponsorId.lastName}`,
              email: proposal.sponsorshipId.sponsorId.email,
              contactNumber: proposal.sponsorshipId.sponsorId.contactNumber,
            }
          : null,
    }));

    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions.' });
  }
});



// Fetch messages for a seeker
router.get('/seeker-messages/:seekerId', protect, async (req, res) => {
  try {
    const proposals = await Proposal.find({ seekerId: req.params.seekerId })
      .populate('sponsorshipId', 'title');

    const messages = proposals.map((proposal) => ({
      sponsorshipTitle: proposal.sponsorshipId?.title || 'Unknown',
      message: proposal.messageToSeeker || 'No message provided.',
      date: proposal.updatedAt,
    }));

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching seeker messages:', error);
    res.status(500).json({ error: 'Failed to fetch submission messages.' });
  }
});

// Fetch details of a single proposal
router.get('/:id', protect, async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id).populate('sponsorshipId', 'title description');
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found.' });
    }

    res.status(200).json(proposal);
  } catch (error) {
    console.error('Error fetching proposal details:', error);
    res.status(500).json({ error: 'Failed to fetch proposal details.' });
  }
});

module.exports = router;
