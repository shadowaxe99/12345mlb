import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoAnalysisComponent from '../components/VideoAnalysisComponent';
import FeedbackComponent from '../components/FeedbackComponent';
import UserProfileComponent from '../components/UserProfileComponent';
import AuthService from '../utils/AuthService';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isLoggedIn = AuthService.isLoggedIn();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="UserProfile"
              component={UserProfileComponent}
              options={{ title: 'User Profile' }}
            />
            <Stack.Screen
              name="VideoAnalysis"
              component={VideoAnalysisComponent}
              options={{ title: 'Video Analysis' }}
            />
            <Stack.Screen
              name="Feedback"
              component={FeedbackComponent}
              options={{ title: 'Feedback' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              getComponent={() => require('../components/LoginComponent').default}
              options={{ title: 'Login' }}
            />
            <Stack.Screen
              name="Register"
              getComponent={() => require('../components/RegisterComponent').default}
              options={{ title: 'Register' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;