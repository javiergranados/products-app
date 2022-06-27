import React, { createContext, useReducer } from 'react';
import { ProductsState, ProductsContextProps } from './ProductsTypes';
import { productsReducer } from './ProductsReducer';
import { Producto } from '../../interfaces/products';

export const ProductsContext = createContext({} as ProductsContextProps);

const PRODUCTS_INITIAL_STATE: ProductsState = {
  products: [],
};

export const ProductsProvider = ({ children }: any) => {
  const [state] = useReducer(productsReducer, PRODUCTS_INITIAL_STATE);

  const loadProducts = async () => {};

  const addProduct = async (product: Producto) => {};

  const updateProduct = async (productId: string, productName: string, categoryId: string) => {};

  const deleteProduct = async (productId: string) => {};

  const loadProductById = async (productId: string) => {
    throw new Error('not implemented');
  };

  const uploadImage = async (productId: string, data: any) => {};

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
