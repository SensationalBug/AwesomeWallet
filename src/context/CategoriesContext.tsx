import React, {createContext, useState, useEffect} from 'react';
import {realm} from '../db';
import {Category} from '../db/schemas';

export interface CategoriesContextType {
  categories: any[]; // Replace 'any[]' with the actual type if available
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
});

export const CategoriesProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = (): void => {
    try {
      const categorias = realm.objects<Category>('Category');
      setCategories(Array.from(categorias));
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{categories}}>
      {children}
    </CategoriesContext.Provider>
  );
};
