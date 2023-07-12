import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import React, {useEffect, useState} from 'react';

import {HomeScreen} from './HomeScreen';
import {LoginScreen} from './LoginScreen';

const Stack = createStackNavigator();

function App() {
  const [initialized, setInitialized] = useState(false);
  const [accessToken, setAccessToken] = useState<string | undefined>();

  useEffect(() => {
    Auth.currentSession()
      .then(session => {
        const jwtToken = session?.getAccessToken().getJwtToken();

        setAccessToken(jwtToken);
      })
      .catch(() => {})
      .finally(() => setInitialized(true));
  }, []);

  if (!initialized) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={accessToken ? 'Home' : 'Login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
