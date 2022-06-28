export interface ProductsResponse {
  total: number;
  productos: Producto[];
}

export interface Producto {
  precio: number;
  _id: string;
  nombre: string;
  categoria: Categoria;
  usuario: Categoria;
  img?: string;
}

export interface Categoria {
  _id: string;
  nombre: string;
  usuario?: CreatedBy;
}

export interface CategoriesResponse {
  total: number;
  categorias: Categoria[];
}

export interface CreatedBy {
  _id: string;
  nombre: string;
}
