import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
});

export default LoginScreen;
