const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /feedback - Create a new feedback entry
router.post('/', authMiddleware.validateToken, feedbackController.createFeedback);

// GET /feedback/:id - Retrieve feedback by ID
router.get('/:id', authMiddleware.validateToken, feedbackController.getFeedbackById);

// GET /feedback/user/:userId - Retrieve all feedback for a specific user
router.get('/user/:userId', authMiddleware.validateToken, feedbackController.getFeedbackForUser);

// PUT /feedback/:id - Update a feedback entry
router.put('/:id', authMiddleware.validateToken, feedbackController.updateFeedback);

// DELETE /feedback/:id - Delete a feedback entry
router.delete('/:id', authMiddleware.validateToken, feedbackController.deleteFeedback);

module.exports = router;