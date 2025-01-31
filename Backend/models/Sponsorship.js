
const mongoose = require('mongoose');

const SponsorshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  sponsorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Active', 'Closed', 'Expired'], default: 'Active' }, // New field
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sponsorship', SponsorshipSchema);

