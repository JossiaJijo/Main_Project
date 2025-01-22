const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const sponsorshipRoutes = require('./routes/sponsorshipRoutes');
const proposalRoutes = require('./routes/proposalRoutes'); // Import proposal routes

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Enable CORS for frontend
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/sponsorships', sponsorshipRoutes); // Sponsorship-related routes
app.use('/api/proposals', proposalRoutes); // Proposal-related routes

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Fallback route for unmatched paths
app.use((req, res) => {
  res.status(404).json({ error: 'API route not found.' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
