import React, { createContext, useEffect, useReducer } from 'react';
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
    console.log({ productName, categoryId });
  };

  const updateProduct = async (productId: string, productName: string, categoryId: string) => {
    console.log({ productId, productName, categoryId });
  };

  const deleteProduct = async (productId: string) => {};

  const loadProductById = async (productId: string) => {
    const response = await coffeeApi.get<Producto>(`/productos/${productId}`);
    return response.data;
  };

  const uploadImage = async (productId: string, data: any) => {};

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
        deleteProduct,
        loadProductById,
        uploadImage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
