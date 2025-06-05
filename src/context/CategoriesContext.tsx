import {realm} from '../db';
import { BSON } from 'realm';
import {Alert} from 'react-native';
import {Category} from '../db/schemas';
import {showToast} from '../utils/toastAlert';
import React, {createContext, useState, useEffect} from 'react';

export interface CategoriesContextType {
  categories: Category[];
  addCategory: (name: string, icon: string) => void;
  deleteCategory: (id: Realm.BSON.ObjectId) => void;
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  addCategory: () => {},
  deleteCategory: () => {},
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

  const addCategory = (name: string, icon: string) => {
    try {
      realm.write(() => {
        realm.create('Category', {
          _id: new BSON.ObjectId(),
          name: name,
          icon: icon,
          is_default: false,
        });
      });
      showToast('success', 'Categoría agregada');
      getCategories();
    } catch (error) {
      console.error('Error al obtener categorias:', error);
    }
  };

  const deleteCategory = (id: BSON.ObjectId) => {
    try {
      realm.write(() => {
        const categoria = realm.objectForPrimaryKey('Category', id);
        if (!categoria) {
          return;
        }

        if (categoria.is_default) {
          showToast('error', 'No se puede eliminar una categoría por defecto');
          return;
        }

        Alert.alert(
          'Cuidado',
          'Estas seguro que deseas eliminar esta categoría',
          [
            {
              text: 'Si',
              onPress: () => {
                realm.write(() => {
                  realm.delete(categoria);
                  showToast('success', 'Categoría eliminada');
                });
                getCategories();
              },
            },
            {text: 'No'},
          ],
        );
      });
      getCategories();
    } catch (error) {
      console.error('Error al borrar la categoría', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
      }}>
      {children}
    </CategoriesContext.Provider>
  );
};
