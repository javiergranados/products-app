import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProductsContext } from '../context';
import { Producto } from '../interfaces/products';

const ProductsScreen = () => {
  const { products } = useContext(ProductsContext);

  const renderItem = (item: Producto) => {
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <Text style={styles.productName}>{item.nombre}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(p) => p._id}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={renderItemSeparatorComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  productName: {
    fontSize: 20,
  },
  itemSeparator: {
    marginVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
});

export default ProductsScreen;
