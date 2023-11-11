const VideoModel = require('../models/VideoModel');
const UserModel = require('../models/UserModel');
const { videoProcessing } = require('../machine_learning/video_processing');
const { API_URL } = require('../utils/constants');

const uploadVideo = async (req, res) => {
  try {
    const { userId, video } = req.body;
    if (!userId || !video) {
      return res.status(400).json({ message: 'Missing user ID or video data' });
    }

    // Validate user existence
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Save video metadata to the database
    const newVideo = await VideoModel.create({
      userId,
      videoUrl: video.url, // Assuming video.url is the location of the video
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Respond with success message and video ID
    res.status(201).json({ message: 'Video uploaded successfully', videoId: newVideo.id });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading video', error: error.message });
  }
};

const analyzeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    if (!videoId) {
      return res.status(400).json({ message: 'Missing video ID' });
    }

    // Retrieve video metadata from the database
    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Process video and analyze
    const analysisResults = await videoProcessing(video.videoUrl);

    // Update video metadata with analysis results
    await VideoModel.findByIdAndUpdate(videoId, {
      analysisResults,
      updatedAt: new Date()
    });

    // Respond with analysis results
    res.status(200).json({ message: 'Video analysis completed', analysisResults });
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing video', error: error.message });
  }
};

const getVideoAnalysisResults = async (req, res) => {
  try {
    const { videoId } = req.params;
    if (!videoId) {
      return res.status(400).json({ message: 'Missing video ID' });
    }

    // Retrieve video analysis results from the database
    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Respond with analysis results
    res.status(200).json({ message: 'Video analysis results retrieved', analysisResults: video.analysisResults });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving video analysis results', error: error.message });
  }
};

module.exports = {
  uploadVideo,
  analyzeVideo,
  getVideoAnalysisResults
};