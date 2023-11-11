const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Get user profile
router.get('/profile', authMiddleware.validateToken, userController.getUserProfile);

// Update user profile
router.put('/profile', authMiddleware.validateToken, userController.updateUserProfile);

module.exports = router;