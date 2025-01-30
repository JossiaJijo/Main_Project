const express = require('express');
const Sponsorship = require('../models/Sponsorship');
const Proposal = require('../models/Proposal');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Fetch sponsorships specific to logged-in sponsor
router.get('/my-sponsorships', protect, async (req, res) => {
  try {
    const sponsorships = await Sponsorship.find({ sponsorId: req.user.id });
    res.status(200).json(sponsorships);
  } catch (error) {
    console.error('Error fetching sponsorships:', error);
    res.status(500).json({ error: 'Failed to fetch sponsorships.' });
  }
});

// Fetch proposals for sponsor's sponsorships
router.get('/my-proposals', protect, async (req, res) => {
  try {
    const proposals = await Proposal.find()
      .populate({
        path: 'sponsorshipId',
        match: { sponsorId: req.user.id },
        select: 'title description deadline',
      })
      .populate('seekerId', 'username email'); // Include seeker details

    const filteredProposals = proposals.filter((p) => p.sponsorshipId !== null);

    const formattedProposals = filteredProposals.map((proposal) => ({
      id: proposal._id,
      sponsorshipTitle: proposal.sponsorshipId?.title || 'Unknown Sponsorship',
      description: proposal.sponsorshipId?.description || 'No description provided.',
      deadline: proposal.sponsorshipId?.deadline
        ? new Date(proposal.sponsorshipId.deadline).toLocaleDateString()
        : 'No deadline provided.',
      seekerName: proposal.seekerId?.username || 'Unknown Seeker',
      status: proposal.status,
      message: proposal.message,
      createdAt: proposal.createdAt,
    }));

    res.status(200).json(formattedProposals);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({ error: 'Failed to fetch proposals.' });
  }
});


// Add sponsorship specific to a sponsor
router.post('/', protect, async (req, res) => {
  const { title, description, deadline } = req.body;

  if (!title || !description || !deadline) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newSponsorship = new Sponsorship({
      title,
      description,
      deadline,
      sponsorId: req.user.id,
    });
    await newSponsorship.save();
    res.status(201).json({ message: 'Sponsorship added successfully!', sponsorship: newSponsorship });
  } catch (error) {
    console.error('Error adding sponsorship:', error);
    res.status(500).json({ error: 'Failed to add sponsorship.' });
  }
});

// Update sponsorship details
router.put('/:id', protect, async (req, res) => {
  const { title, description, deadline } = req.body;

  if (!title || !description || !deadline) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const updatedSponsorship = await Sponsorship.findOneAndUpdate(
      { _id: req.params.id, sponsorId: req.user.id },
      { title, description, deadline },
      { new: true, runValidators: true }
    );

    if (!updatedSponsorship) {
      return res.status(404).json({ error: 'Sponsorship not found.' });
    }

    res.status(200).json({ message: 'Sponsorship updated successfully!', sponsorship: updatedSponsorship });
  } catch (error) {
    console.error('Error updating sponsorship:', error);
    res.status(500).json({ error: 'Failed to update sponsorship.' });
  }
});

// Delete sponsorship
router.delete('/:id', protect, async (req, res) => {
  try {
    const sponsorship = await Sponsorship.findOneAndDelete({
      _id: req.params.id,
      sponsorId: req.user.id,
    });

    if (!sponsorship) {
      return res.status(404).json({ error: 'Sponsorship not found.' });
    }

    res.status(200).json({ message: 'Sponsorship deleted successfully.' });
  } catch (error) {
    console.error('Error deleting sponsorship:', error);
    res.status(500).json({ error: 'Failed to delete sponsorship.' });
  }
});
// Fetch all sponsorship opportunities

router.get('/all', protect, async (req, res) => {
  try {
    const seekerId = req.user.id;

    // Fetch proposals submitted by the seeker
    const submittedProposals = await Proposal.find({ seekerId }).select('sponsorshipId');
    const excludedSponsorshipIds = submittedProposals.map((proposal) => proposal.sponsorshipId.toString());

    // Fetch all sponsorships excluding already submitted ones
    const sponsorships = await Sponsorship.find({
      _id: { $nin: excludedSponsorshipIds }, // Exclude submitted sponsorships
    });

    res.status(200).json({
      sponsorships,
      message: sponsorships.length ? null : 'No sponsorship opportunities available.',
    });
  } catch (error) {
    console.error('Error fetching sponsorships:', error.message);
    res.status(500).json({ error: 'Failed to fetch sponsorship opportunities.' });
  }
});





// Submit a proposal for a sponsorship
router.post('/submit-proposal', protect, async (req, res) => {
  const { sponsorshipId, message } = req.body;
  const seekerId = req.user.id;

  if (!sponsorshipId || !message) {
    return res.status(400).json({ error: 'Sponsorship ID and message are required.' });
  }

  try {
    const proposal = new Proposal({ sponsorshipId, seekerId, message });
    await proposal.save();
    res.status(201).json({ message: 'Proposal submitted successfully!' });
  } catch (error) {
    console.error('Error submitting proposal:', error);
    res.status(500).json({ error: 'Failed to submit proposal.' });
  }
});
// Submit a proposal for a sponsorship
router.post('/submit-proposal', protect, async (req, res) => {
  const { sponsorshipId, message } = req.body;
  const seekerId = req.user.id; // Extracted from `protect` middleware

  if (!sponsorshipId || !message) {
    return res.status(400).json({ error: 'Sponsorship ID and message are required.' });
  }

  try {
    const proposal = new Proposal({ sponsorshipId, seekerId, message });
    await proposal.save();
    res.status(201).json({ message: 'Proposal submitted successfully!' });
  } catch (error) {
    console.error('Error submitting proposal:', error);
    res.status(500).json({ error: 'Failed to submit proposal.' });
  }
});

// Fetch proposals for a sponsor's sponsorships
router.get('/my-proposals', protect, async (req, res) => {
  try {
    const proposals = await Proposal.find()
      .populate({
        path: 'sponsorshipId',
        match: { sponsorId: req.user.id },
        select: 'title description',
      })
      .populate('seekerId', 'username email'); // Include seeker details

    const filteredProposals = proposals.filter((p) => p.sponsorshipId !== null);
    res.status(200).json(filteredProposals);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({ error: 'Failed to fetch proposals.' });
  }
});


module.exports = router;
