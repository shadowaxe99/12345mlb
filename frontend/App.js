import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/utils/AuthService';
import { ApiProvider } from './src/utils/ApiService';
import globalStyles from './src/styles/globalStyles';

const App = () => {
  return (
    <SafeAreaProvider style={globalStyles.container}>
      <AuthProvider>
        <ApiProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ApiProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;