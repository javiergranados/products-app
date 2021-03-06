import { ProductsActions, ProductsState } from './ProductsTypes';

const productsReducer = (state: ProductsState, action: ProductsActions): ProductsState => {
  switch (action.type) {
    case 'LOAD_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export { productsReducer };
