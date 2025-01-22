const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
  sponsorshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sponsorship', required: true },
  seekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Dismissed'], default: 'Pending' },
  messageToSeeker: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Proposal', ProposalSchema);
