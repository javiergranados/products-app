import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParamList } from '../navigators/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParamList, 'ProductScreen'> {}

const ProductScreen = ({ route, navigation }: Props) => {
  const { id, name } = route.params;

  const text = id ? `${id} - ${name}` : 'New Product';

  useEffect(() => {
    navigation.setOptions({
      title: name ? name : 'New Product',
    });
  }, []);

  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};

export default ProductScreen;
