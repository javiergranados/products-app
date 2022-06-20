import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ProductsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products screen</Text>
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

export default ProductsScreen;
