import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { launchCamera } from 'react-native-image-picker';
import { ProductsStackParamList } from '../navigators/ProductsNavigator';
import { ProductsContext } from '../context';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { Producto } from '../interfaces/products';

interface Props extends StackScreenProps<ProductsStackParamList, 'ProductScreen'> {}

const ProductScreen = ({ route, navigation }: Props) => {
  const { categories } = useCategories();
  const { id: idFromParams = '', name: nameFromParams = '' } = route.params;

  const { loadProductById, addProduct, updateProduct, uploadImage } = useContext(ProductsContext);

  const [tempImg, setTempImg] = useState<string>('');
  const { id, name, categoryId, img, onChange, setFormValue } = useForm({
    id: idFromParams,
    name: nameFromParams,
    categoryId: '',
    img: '',
  });

  const categoryOptions = categories.map((c) => <Picker.Item key={c._id} value={c._id} label={c.nombre} />);

  const loadProduct = async () => {
    if (id.length === 0) {
      return;
    }

    const product = await loadProductById(id);
    setFormValue({
      id,
      name,
      categoryId: product.categoria._id,
      img: product.img || '',
    });
  };

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      (resp) => {
        if (resp.didCancel || !resp.assets || !resp.assets[0].uri) {
          return;
        }
        uploadImage(id, resp);
        setTempImg(resp.assets[0].uri);
      },
    );
  };

  const handleSave = async () => {
    if (id.length > 0) {
      const productUpdated: Producto = await updateProduct(id, name, categoryId);
      setFormValue({
        id: productUpdated._id,
        name: productUpdated.nombre,
        categoryId: productUpdated.categoria._id,
        img: productUpdated.img || '',
      });
      return;
    }

    const newProduct: Producto = await addProduct(name, categoryId);
    onChange(newProduct._id, 'id');
  };

  useEffect(() => {
    navigation.setOptions({
      title: name ? name : 'Product name',
    });
  }, [name]);

  useEffect(() => {
    if (categories.length > 0 && id.length === 0) {
      onChange(categories[0]._id, 'categoryId');
    }
  }, [categories]);

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Product name:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Product"
          value={name}
          onChangeText={(value) => onChange(value, 'name')}
        />
        <Text style={styles.label}>Category:</Text>
        <Picker selectedValue={categoryId} onValueChange={(itemValue) => onChange(itemValue, 'categoryId')}>
          {categoryOptions}
        </Picker>
        <Button title="Save" color="#5856D6" onPress={handleSave} />
        {id.length > 0 && (
          <View style={styles.buttonsContainer}>
            <Button title="Camera" color="#5856D6" onPress={takePhoto} />
            <View style={{ width: 10 }} />
            <Button title="Gallery" color="#5856D6" />
          </View>
        )}
        {img.length > 0 && !tempImg && <Image source={{ uri: img }} style={{ width: '100%', height: 300 }} />}
        {tempImg.length > 0 && <Image source={{ uri: tempImg }} style={{ width: '100%', height: 300 }} />}
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
    marginBottom: 40,
  },
});

export default ProductScreen;
