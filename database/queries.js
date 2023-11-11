const { Pool } = require('pg');
const { USER_SCHEMA, FEEDBACK_SCHEMA, VIDEO_SCHEMA } = require('../sharedDependencies').dataSchemas;

const pool = new Pool({
  // Configuration options, typically loaded from environment variables
});

const createUser = async (user) => {
  const query = {
    text: `INSERT INTO users(${Object.keys(USER_SCHEMA).join(', ')}) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    values: [user.id, user.username, user.email, user.passwordHash, user.createdAt, user.updatedAt],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const getUserById = async (id) => {
  const query = {
    text: `SELECT * FROM users WHERE id = $1`,
    values: [id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const createFeedback = async (feedback) => {
  const query = {
    text: `INSERT INTO feedback(${Object.keys(FEEDBACK_SCHEMA).join(', ')}) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    values: [feedback.id, feedback.userId, feedback.videoId, feedback.content, feedback.createdAt, feedback.updatedAt],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const getFeedbackByVideoId = async (videoId) => {
  const query = {
    text: `SELECT * FROM feedback WHERE videoId = $1`,
    values: [videoId],
  };
  const { rows } = await pool.query(query);
  return rows;
};

const createVideo = async (video) => {
  const query = {
    text: `INSERT INTO videos(${Object.keys(VIDEO_SCHEMA).join(', ')}) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    values: [video.id, video.userId, JSON.stringify(video.analysisResults), video.videoUrl, video.createdAt, video.updatedAt],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

const getVideoById = async (id) => {
  const query = {
    text: `SELECT * FROM videos WHERE id = $1`,
    values: [id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

module.exports = {
  createUser,
  getUserById,
  createFeedback,
  getFeedbackByVideoId,
  createVideo,
  getVideoById,
};