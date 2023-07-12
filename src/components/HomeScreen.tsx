import {Auth} from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {Button} from './Button';

export function HomeScreen({navigation}: any) {
  const [accessToken, setAccessToken] = useState<string | undefined>();

  useEffect(() => {
    Auth.currentSession().then(session => {
      const jwtToken = session?.getAccessToken().getJwtToken();

      setAccessToken(jwtToken);
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Signed in</Text>
      {accessToken && (
        <Text
          style={
            styles.text
          }>{`Cognito access token:\n\n ${accessToken}`}</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button
          onPress={async () => {
            await Auth.signOut();

            navigation.navigate('Login');
          }}>
          Sign out
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  header: {
    marginVertical: 20,
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
  text: {
    marginVertical: 20,
    color: 'black',
    fontSize: 12,
  },
  buttonContainer: {
    width: '100%',
  },
});
