import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';

export type ProductsStackParamList = {
  ProductsScreen: undefined;
  ProductScreen: { id?: string; name?: string };
};

const ProductsStack = createStackNavigator<ProductsStackParamList>();

const ProductsNavigator = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <ProductsStack.Screen name="ProductsScreen" component={ProductsScreen} options={{ title: 'Products' }} />
      <ProductsStack.Screen name="ProductScreen" component={ProductScreen} />
    </ProductsStack.Navigator>
  );
};

export default ProductsNavigator;
