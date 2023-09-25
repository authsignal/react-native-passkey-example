import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';

import {Button} from './Button';
import {post} from '../api';
import {authsignal} from '../authsignal';

export function LoginScreen({navigation}: any) {
  const [userName, setUserName] = useState('');

  const createSession = async (token?: string) => {
    if (!token) {
      return false;
    }

    // Send the token returned by the Authsignal SDK to your backend and validate it
    // If valid then create a logged-in session for the user however you like
    // This example simply returns a mock session token
    const {sessionToken, error} = await post('/session', {token});

    const success = sessionToken && !error;

    if (success) {
      await AsyncStorage.setItem('@session_token', sessionToken);
    } else {
      showError(error);
    }

    return success;
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      authsignal.passkey
        .signIn({autofill: true})
        .then(({data, error}) => !error && createSession(data))
        .then(success => success && navigation.navigate('Home'));
    }
  }, [navigation]);

  const onPressSignUp = async () => {
    authsignal.passkey.cancel();

    const {token, error: apiError} = await post('/sign-up', {userName});

    if (apiError) {
      return showError(apiError);
    }

    const {data, error} = await authsignal.passkey.signUp({token, userName});

    if (error) {
      return showError(error);
    }

    const success = await createSession(data);

    if (success) {
      navigation.navigate('Home');
    }
  };

  const onPressSignIn = async () => {
    authsignal.passkey.cancel();

    const {token, error: apiError} = await post('/sign-in', {userName});

    if (apiError) {
      return showError(apiError);
    }

    const {data, error} = await authsignal.passkey.signIn({token});

    if (error) {
      return showError(error);
    }

    const success = await createSession(data);

    if (success) {
      navigation.navigate('Home');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={setUserName}
          value={userName}
          autoCapitalize={'none'}
          autoCorrect={false}
          textContentType={'username'}
          autoFocus={false}
        />
        <Button onPress={onPressSignUp}>Sign up</Button>
        <Text>Or</Text>
        <Button onPress={onPressSignIn}>Sign in</Button>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    alignSelf: 'stretch',
    margin: 20,
    height: 50,
    borderColor: 'black',
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
  },
});

function showError(message: string) {
  Alert.alert('Error', message);
}
