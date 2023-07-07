import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';

import {HomeScreen} from './HomeScreen';
import {LoginScreen} from './LoginScreen';

const Stack = createStackNavigator();

function App() {
  const [initialized, setInitialized] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const storedToken = await AsyncStorage.getItem('@session_token');

      if (storedToken) {
        setSessionToken(storedToken);
      }

      setInitialized(true);
    })();
  }, []);

  if (!initialized) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={sessionToken ? 'Home' : 'Login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
