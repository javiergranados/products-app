import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ProtectedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protected screen</Text>
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

export default ProtectedScreen;
