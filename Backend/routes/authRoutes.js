const express = require('express');
const { register, login, getUserProfile, forgotPassword, updateUserProfile } = require('../controllers/authController'); // Added updateUserProfile import
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route for getting the user profile (protected)
router.get('/user', protect, getUserProfile);

// Route for getting the profile of the logged-in user (protected)
router.get('/profile', protect, async (req, res) => {
  try {
    console.log('Fetching profile for user:', req.user); // Debugging: Ensure req.user is defined
    const user = await User.findById(req.user.id).select('-password'); // Fetch user excluding the password

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Handle user not found
    }

    res.status(200).json(user); // Send user data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Failed to fetch user profile' }); // Handle server error
  }
});

// Route for updating user profile
router.put('/profile', protect, updateUserProfile);


module.exports = router;
