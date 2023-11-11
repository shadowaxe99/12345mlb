const FeedbackModel = require('../models/FeedbackModel');
const UserModel = require('../models/UserModel');
const VideoModel = require('../models/VideoModel');
const { v4: uuidv4 } = require('uuid');

const createFeedback = async (req, res) => {
  try {
    const { userId, videoId, content } = req.body;

    // Validate user and video existence
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Create new feedback entry
    const feedback = await FeedbackModel.create({
      id: uuidv4(),
      userId,
      videoId,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error creating feedback', error: error.message });
  }
};

const getFeedbackByVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    // Validate video existence
    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Retrieve feedback for the video
    const feedback = await FeedbackModel.find({ videoId });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving feedback', error: error.message });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { content } = req.body;

    // Update feedback content
    const updatedFeedback = await FeedbackModel.findByIdAndUpdate(feedbackId, {
      content,
      updatedAt: new Date()
    }, { new: true });

    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback', error: error.message });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;

    // Delete feedback entry
    const deletedFeedback = await FeedbackModel.findByIdAndDelete(feedbackId);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error: error.message });
  }
};

module.exports = {
  createFeedback,
  getFeedbackByVideo,
  updateFeedback,
  deleteFeedback
};