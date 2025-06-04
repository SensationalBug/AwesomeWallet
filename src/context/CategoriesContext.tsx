import React, {createContext, useState, useEffect} from 'react';
import {realm} from '../db';
import {Category} from '../db/schemas';

export interface CategoriesContextType {
  categories: Category[];
  newCategory: {
    name: string;
    icon: string;
  };
  setNewCategory: React.Dispatch<
    React.SetStateAction<{
      name: string;
      icon: string;
    }>
  >;
  addCategory: any;
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  newCategory: {
    name: '',
    icon: '',
  },
  setNewCategory: () => {},
  addCategory: () => {},
});

export const CategoriesProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    icon: '',
  });

  const getCategories = (): void => {
    try {
      const categorias = realm.objects<Category>('Category');
      setCategories(Array.from(categorias));
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const addCategory = () => {
    try {
      realm.write(() => {
        realm.create('Category', {
          _id: new Realm.BSON.ObjectId(),
          name: newCategory.name,
          icon: newCategory.icon,
          is_default: false,
        });
      });
      getCategories();
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{categories, newCategory, setNewCategory, addCategory}}>
      {children}
    </CategoriesContext.Provider>
  );
};
