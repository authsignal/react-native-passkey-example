import {Auth} from 'aws-amplify';
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
import jwtDecode from 'jwt-decode';

import {Button} from './Button';
import {authsignal} from '../config';

let cognitoUser: any;

export function LoginScreen({navigation}: any) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return;
    }

    authsignal.passkey.signIn({autofill: true}).then(async ({data}) => {
      if (!data) {
        return;
      }

      const decoded = jwtDecode<any>(data);

      cognitoUser = await Auth.signIn(decoded.other.username);

      await Auth.sendCustomChallengeAnswer(cognitoUser, data);

      navigation.navigate('Home');
    });
  });

  const onPressSignUp = async () => {
    authsignal.passkey.cancel();

    const signUpParams = {
      username: userName,
      password: Math.random().toString(36).slice(-16) + 'X',
    };

    await Auth.signUp(signUpParams);

    cognitoUser = await Auth.signIn(userName);

    const {token} = cognitoUser.challengeParam;

    const {data, error} = await authsignal.passkey.signUp({token, userName});

    if (error || !data) {
      return Alert.alert('Error', error ?? 'Sign up error');
    }

    await Auth.sendCustomChallengeAnswer(cognitoUser, data);

    navigation.navigate('Home');
  };

  const onPressSignIn = async () => {
    authsignal.passkey.cancel();

    cognitoUser = await Auth.signIn(userName);

    const {token} = cognitoUser.challengeParam;

    const {data, error} = await authsignal.passkey.signIn({token});

    if (error || !data) {
      return Alert.alert('Error', error ?? 'Sign in error');
    }

    await Auth.sendCustomChallengeAnswer(cognitoUser, data);

    navigation.navigate('Home');
  };

  const onFocusUsername = async () => {
    if (Platform.OS !== 'android') {
      return;
    }

    const {data} = await authsignal.passkey.signIn({autofill: true});

    if (!data) {
      return;
    }

    const decoded = jwtDecode<any>(data);

    cognitoUser = await Auth.signIn(decoded.other.username);

    await Auth.sendCustomChallengeAnswer(cognitoUser, data);

    navigation.navigate('Home');
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
          autoFocus={false}
          autoComplete={'username'}
          textContentType={'username'}
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
