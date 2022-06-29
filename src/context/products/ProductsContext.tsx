import React, { createContext, useEffect, useReducer } from 'react';
import { Platform } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import { ProductsState, ProductsContextProps } from './ProductsTypes';
import { productsReducer } from './ProductsReducer';
import { Producto, ProductsResponse } from '../../interfaces/products';
import coffeeApi from '../../api/coffeeApi';

export const ProductsContext = createContext({} as ProductsContextProps);

const PRODUCTS_INITIAL_STATE: ProductsState = {
  products: [],
};

export const ProductsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(productsReducer, PRODUCTS_INITIAL_STATE);

  const loadProducts = async () => {
    const response = await coffeeApi.get<ProductsResponse>('/productos?limite=50');
    dispatch({ type: 'LOAD_PRODUCTS', payload: response.data.productos });
  };

  const addProduct = async (productName: string, categoryId: string) => {
    const response = await coffeeApi.post<Producto>('/productos', { nombre: productName, categoria: categoryId });
    dispatch({ type: 'ADD_PRODUCT', payload: response.data });

    return response.data;
  };

  const updateProduct = async (productId: string, productName: string, categoryId: string) => {
    const response = await coffeeApi.put<Producto>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId,
    });

    const productsFiltered = state.products.filter((p) => p._id !== response.data._id);
    dispatch({ type: 'UPDATE_PRODUCT', payload: [...productsFiltered, response.data] });

    return response.data;
  };

  const loadProductById = async (productId: string) => {
    const response = await coffeeApi.get<Producto>(`/productos/${productId}`);
    return response.data;
  };

  const uploadImage = async (productId: string, data: ImagePickerResponse) => {
    const params = {
      name: data.assets![0].fileName!,
      type: data.assets![0].type!,
      uri: Platform.OS === 'ios' ? data.assets![0].uri!.replace('file://', '') : data.assets![0].uri!,
    };
    const fileToUpload = JSON.parse(JSON.stringify(params));

    const formData = new FormData();
    formData.append('archivo', fileToUpload);

    try {
      await coffeeApi.put(`/uploads/productos/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        loadProducts,
        addProduct,
        updateProduct,
        loadProductById,
        uploadImage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
