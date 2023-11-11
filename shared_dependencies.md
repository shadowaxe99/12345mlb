```json
{
  "sharedDependencies": {
    "exportedVariables": [
      "API_URL",
      "AUTH_TOKEN",
      "USER_SCHEMA",
      "FEEDBACK_SCHEMA",
      "VIDEO_SCHEMA",
      "PITCH_TYPE_CLASSIFIER_MODEL_PATH",
      "SWING_QUALITY_ANALYZER_MODEL_PATH"
    ],
    "dataSchemas": {
      "User": {
        "id": "UUID",
        "username": "String",
        "email": "String",
        "passwordHash": "String",
        "createdAt": "Timestamp",
        "updatedAt": "Timestamp"
      },
      "Feedback": {
        "id": "UUID",
        "userId": "UUID",
        "videoId": "UUID",
        "content": "String",
        "createdAt": "Timestamp",
        "updatedAt": "Timestamp"
      },
      "Video": {
        "id": "UUID",
        "userId": "UUID",
        "analysisResults": "JSON",
        "videoUrl": "String",
        "createdAt": "Timestamp",
        "updatedAt": "Timestamp"
      }
    },
    "idNamesOfDOMElements": [
      "loginButton",
      "registerButton",
      "videoUploadInput",
      "feedbackMessageList",
      "userProfileSection",
      "analysisResultsChart"
    ],
    "messageNames": [
      "USER_REGISTERED",
      "USER_LOGGED_IN",
      "VIDEO_UPLOADED",
      "FEEDBACK_RECEIVED",
      "ANALYSIS_COMPLETED"
    ],
    "functionNames": [
      "registerUser",
      "loginUser",
      "uploadVideo",
      "getFeedback",
      "analyzeVideo",
      "getUserProfile",
      "updateUserProfile",
      "handleVideoProcessing",
      "evaluatePitchType",
      "evaluateSwingQuality",
      "connectToDatabase",
      "queryDatabase",
      "deployToAWS",
      "configureAWSResources"
    ]
  }
}
```