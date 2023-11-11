import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { API_URL } from '../utils/ApiService';
import globalStyles from '../styles/globalStyles';

const VideoAnalysisComponent = ({ navigation }) => {
  const [videoUri, setVideoUri] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleVideoPick = async (video) => {
    if (!video.cancelled) {
      setVideoUri(video.uri);
    }
  };

  const uploadVideo = async () => {
    setIsUploading(true);
    try {
      const videoBase64 = await FileSystem.readAsStringAsync(videoUri, { encoding: FileSystem.EncodingType.Base64 });
      const response = await fetch(`${API_URL}/video/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({ video: videoBase64 }),
      });
      const data = await response.json();
      if (data.success) {
        setAnalysisResults(data.analysisResults);
        navigation.navigate('AnalysisResultsChart', { analysisResults: data.analysisResults });
      } else {
        console.error('Video upload failed:', data.message);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const renderUploadButton = useCallback(() => (
    <TouchableOpacity
      style={globalStyles.button}
      onPress={uploadVideo}
      disabled={isUploading}
    >
      {isUploading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={globalStyles.buttonText}>Upload Video</Text>
      )}
    </TouchableOpacity>
  ), [isUploading]);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Video Analysis</Text>
      {videoUri ? (
        <Video
          source={{ uri: videoUri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={globalStyles.video}
        />
      ) : (
        <Text>No video selected</Text>
      )}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('VideoPicker', { onVideoPick: handleVideoPick })}
      >
        <Text style={globalStyles.buttonText}>Pick a Video</Text>
      </TouchableOpacity>
      {videoUri && renderUploadButton()}
      {analysisResults && (
        <View style={globalStyles.analysisResults}>
          {/* Render analysis results here */}
        </View>
      )}
    </View>
  );
};

export default VideoAnalysisComponent;