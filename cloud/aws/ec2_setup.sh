#!/bin/bash

# Update system packages
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js and NPM
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Install Python and pip for machine learning scripts
sudo apt-get install -y python3 python3-pip

# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Install PM2 to keep the Node.js server running
sudo npm install pm2@latest -g

# Clone the repository (placeholder for actual repository URL)
git clone https://github.com/your-repository/aibaseballcoach.git

# Navigate to the backend directory
cd aibaseballcoach/backend

# Install backend dependencies
npm install

# Start the backend server using PM2
pm2 start server.js --name aibaseballcoach-backend

# Navigate to the frontend directory
cd ../frontend

# Install frontend dependencies
npm install

# Build the React Native application for production
npm run build

# Configure PostgreSQL
sudo -u postgres psql -c "CREATE DATABASE aibaseballcoach;"
sudo -u postgres psql -c "CREATE USER aibaseballcoach_user WITH ENCRYPTED PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE aibaseballcoach TO aibaseballcoach_user;"

# Run the database migrations (placeholder for actual migration command)
# ./run_migrations.sh

# Set up environment variables
echo "export API_URL=http://localhost:3000" >> ~/.profile
echo "export AUTH_TOKEN=your_auth_token" >> ~/.profile
echo "export PITCH_TYPE_CLASSIFIER_MODEL_PATH=/path/to/pitch_type_classifier.h5" >> ~/.profile
echo "export SWING_QUALITY_ANALYZER_MODEL_PATH=/path/to/swing_quality_analyzer.h5" >> ~/.profile

# Reload the environment variables
source ~/.profile

# Set up AWS resources using CloudFormation
aws cloudformation create-stack --stack-name aibaseballcoach-stack --template-body file://cloud/aws/cloudformation.yml

# Set up S3 bucket policies
aws s3api put-bucket-policy --bucket your-bucket-name --policy file://cloud/aws/s3_policies.json

# Set up EC2 security groups, IAM roles, and other resources as needed
# This is a placeholder for additional AWS CLI commands to configure the environment

echo "AI Baseball Coach application setup is complete."