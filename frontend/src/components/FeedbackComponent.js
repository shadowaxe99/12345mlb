import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { API_URL } from '../utils/ApiService';
import globalStyles from '../styles/globalStyles';

const FeedbackComponent = ({ videoId }) => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch(`${API_URL}/feedback/${videoId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFeedbackList(data);
      } else {
        throw new Error(data.message || 'Error fetching feedback');
      }
    } catch (error) {
      console.error('Fetch Feedback Error:', error);
    }
  };

  const renderFeedbackItem = ({ item }) => (
    <View style={styles.feedbackItem}>
      <Text style={styles.feedbackContent}>{item.content}</Text>
      <Text style={styles.feedbackDate}>{new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Feedback</Text>
      <FlatList
        data={feedbackList}
        renderItem={renderFeedbackItem}
        keyExtractor={item => item.id}
        style={styles.feedbackList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackList: {
    width: '100%',
  },
  feedbackItem: {
    backgroundColor: '#f7f7f7',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  feedbackContent: {
    fontSize: 16,
    color: '#333',
  },
  feedbackDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default FeedbackComponent;