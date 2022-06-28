import { useEffect, useState } from 'react';
import coffeeApi from '../api/coffeeApi';
import { Categoria, CategoriesResponse } from '../interfaces/products';

export const useCategories = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Categoria[]>([]);

  const getCategories = async () => {
    const response = await coffeeApi.get<CategoriesResponse>('/categorias');
    setCategories(response.data.categorias);
    setIsLoading(false);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return { isLoading, categories };
};
