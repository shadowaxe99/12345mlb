-- PostgreSQL database initialization script for AI Baseball Coach application

-- Create Users Table
CREATE TABLE IF NOT EXISTS Users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash CHAR(60) NOT NULL, -- Assuming bcrypt hash
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Feedback Table
CREATE TABLE IF NOT EXISTS Feedback (
    id UUID PRIMARY KEY,
    userId UUID REFERENCES Users(id) ON DELETE CASCADE,
    videoId UUID,
    content TEXT NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Video Table
CREATE TABLE IF NOT EXISTS Videos (
    id UUID PRIMARY KEY,
    userId UUID REFERENCES Users(id) ON DELETE CASCADE,
    analysisResults JSONB,
    videoUrl TEXT NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster search
CREATE INDEX IF NOT EXISTS idx_users_email ON Users(email);
CREATE INDEX IF NOT EXISTS idx_feedback_userId ON Feedback(userId);
CREATE INDEX IF NOT EXISTS idx_videos_userId ON Videos(userId);

-- Trigger to update the updatedAt column on each row update
CREATE OR REPLACE FUNCTION update_updatedAt_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_updatedAt BEFORE UPDATE ON Users FOR EACH ROW EXECUTE FUNCTION update_updatedAt_column();
CREATE TRIGGER update_feedback_updatedAt BEFORE UPDATE ON Feedback FOR EACH ROW EXECUTE FUNCTION update_updatedAt_column();
CREATE TRIGGER update_video_updatedAt BEFORE UPDATE ON Videos FOR EACH ROW EXECUTE FUNCTION update_updatedAt_column();