const mongoose = require('mongoose');
const Sponsorship = require('../models/Sponsorship');
const dotenv = require('dotenv');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const expireSponsorships = async () => {
  try {
    const currentDate = new Date();

    // Update sponsorships where deadline has passed
    const result = await Sponsorship.updateMany(
      { deadline: { $lt: currentDate }, status: 'Active' },
      { $set: { status: 'Expired' } }
    );

    console.log(`✅ Expired ${result.modifiedCount} sponsorship(s).`);
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error updating expired sponsorships:', error);
    mongoose.connection.close();
  }
};

// Run the function
expireSponsorships();
