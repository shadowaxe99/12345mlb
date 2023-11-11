const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /videos/upload - Endpoint to upload a video for analysis
router.post('/upload', authMiddleware.verifyToken, videoController.uploadVideo);

// GET /videos/:id - Endpoint to get the analysis results of a specific video
router.get('/:id', authMiddleware.verifyToken, videoController.getVideoAnalysis);

// POST /videos/:id/analyze - Endpoint to analyze a video
router.post('/:id/analyze', authMiddleware.verifyToken, videoController.analyzeVideo);

// DELETE /videos/:id - Endpoint to delete a specific video
router.delete('/:id', authMiddleware.verifyToken, videoController.deleteVideo);

module.exports = router;