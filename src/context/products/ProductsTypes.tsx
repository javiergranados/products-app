import { Producto } from '../../interfaces/products';

export interface ProductsState {
  products: Producto[];
}

export interface ProductsContextProps extends ProductsState {
  loadProducts: () => Promise<void>;
  addProduct: (productName: string, categoryId: string) => Promise<Producto>;
  updateProduct: (productId: string, productName: string, categoryId: string) => Promise<Producto>;
  deleteProduct: (productId: string) => Promise<void>;
  loadProductById: (productId: string) => Promise<Producto>;
  uploadImage: (productId: string, data: any) => Promise<void>;
}

export type ProductsActions =
  | { type: 'LOAD_PRODUCTS'; payload: Producto[] }
  | { type: 'ADD_PRODUCT'; payload: Producto }
  | { type: 'UPDATE_PRODUCT'; payload: Producto[] }
  | { type: 'DELETE_PRODUCT' }
  | { type: 'UPLOAD_IMAGE' };
