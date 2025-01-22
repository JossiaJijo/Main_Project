const express = require('express');
const { register, login, getUserProfile, forgotPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route for getting the user profile (protected)
router.get('/user', protect, getUserProfile);


module.exports = router;
