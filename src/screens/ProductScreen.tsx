import React, { useEffect } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParamList } from '../navigators/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParamList, 'ProductScreen'> {}

const ProductScreen = ({ route, navigation }: Props) => {
  const { id, name } = route.params;

  const handleSave = () => {};

  useEffect(() => {
    navigation.setOptions({
      title: name ? name : 'New Product',
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Product name:</Text>
        <TextInput placeholder="Product" style={styles.textInput} />
        <Text style={styles.label}>Category:</Text>
        <Button title="Save" onPress={handleSave} color="#5856D6" />
        <View style={styles.buttonsContainer}>
          <Button title="Camera" color="#5856D6" />
          <View style={{ width: 10 }} />
          <Button title="Gallery" color="#5856D6" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default ProductScreen;
