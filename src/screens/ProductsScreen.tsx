import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsContext } from '../context';
import { ProductsStackParamList } from '../navigators/ProductsNavigator';
import { Producto } from '../interfaces/products';

interface Props extends StackScreenProps<ProductsStackParamList, 'ProductsScreen'> {}

const ProductsScreen = ({ navigation }: Props) => {
  const { products, loadProducts } = useContext(ProductsContext);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const renderItem = (item: Producto) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ProductScreen', { id: item._id, name: item.nombre })}
      >
        <Text style={styles.productName}>{item.nombre}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadProducts();
    setIsRefreshing(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate('ProductScreen', {})}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
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
