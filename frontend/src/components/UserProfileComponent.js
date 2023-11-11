import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { AuthService } from '../utils/AuthService';
import { ApiService } from '../utils/ApiService';
import globalStyles from '../styles/globalStyles';

const UserProfileComponent = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await AuthService.getUserProfile();
        setUserProfile(profile);
        setUsername(profile.username);
        setEmail(profile.email);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const updatedProfile = await ApiService.updateUserProfile({ username, email });
      setUserProfile(updatedProfile);
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  };

  if (!userProfile) {
    return <Text>Loading profile...</Text>;
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>User Profile</Text>
      {editMode ? (
        <View>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Button title="Save" onPress={handleUpdateProfile} />
          <Button title="Cancel" onPress={() => setEditMode(false)} />
        </View>
      ) : (
        <View>
          <Text>Username: {userProfile.username}</Text>
          <Text>Email: {userProfile.email}</Text>
          <Button title="Edit" onPress={() => setEditMode(true)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 5,
  },
});

export default UserProfileComponent;