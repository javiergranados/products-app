import { ImagePickerResponse } from 'react-native-image-picker';
import { Producto } from '../../interfaces/products';

export interface ProductsState {
  products: Producto[];
}

export interface ProductsContextProps extends ProductsState {
  loadProducts: () => Promise<void>;
  addProduct: (productName: string, categoryId: string) => Promise<Producto>;
  updateProduct: (productId: string, productName: string, categoryId: string) => Promise<Producto>;
  loadProductById: (productId: string) => Promise<Producto>;
  uploadImage: (productId: string, data: ImagePickerResponse) => Promise<void>;
}

export type ProductsActions =
  | { type: 'LOAD_PRODUCTS'; payload: Producto[] }
  | { type: 'ADD_PRODUCT'; payload: Producto }
  | { type: 'UPDATE_PRODUCT'; payload: Producto[] }
  | { type: 'UPLOAD_IMAGE' };
