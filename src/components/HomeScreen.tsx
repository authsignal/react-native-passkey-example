import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {Button} from './Button';

export function HomeScreen({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Signed in</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={async () => {
            await AsyncStorage.removeItem('@session_token');

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
  text: {
    marginVertical: 20,
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
  },
});
