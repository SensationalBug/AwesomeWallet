import React, {useCallback, useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import StyledText from '../components/custom/StyledText';
import {CategoriesContext} from '../context/CategoriesContext';
import {TransactionContext} from '../context/TransactionContext';
import Realm, {BSON} from 'realm';
import {Category, Transaction} from '../db/schemas';

const AtScript = () => {
  const {addTransaction, getTransactions} = useContext(TransactionContext);
  const {categories} = useContext(CategoriesContext);

  const random = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min)) + min;
  };

  const deleteAll = useCallback(() => {
    Realm.deleteFile({
      schema: [Transaction],
    });
    getTransactions();
  }, [getTransactions]);

  const addRandomTransactions = useCallback(() => {
    try {
      for (let i = 0; i < 5; i++) {
        const selectedCategoryIndex = random(0, categories.length - 1);
        const selectedCategory = categories[selectedCategoryIndex] as Category;
        const currentDate = `${random(2022, 2024)}-${random(1, 6)}-${random(
          1,
          10,
        )}`;

        const transactionToAdd = {
          _id: new BSON.ObjectId(),
          amount: random(1000, 10000),
          category: String(selectedCategory._id),
          concept: String(selectedCategory.name),
          cDate: currentDate,
          file: '/home',
          type: i % 3 === 0 ? 'credito' : 'debito',
        };

        addTransaction(transactionToAdd);
      }
    } catch (error) {
      console.error('Error al añadir transacciones aleatorias:', error);
    }
  }, [categories, addTransaction]);

  return (
    <View>
      <TouchableOpacity
        onPress={() => addRandomTransactions()}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          padding: 15,
          elevation: 8,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <StyledText bold="bold" variant="titleMedium" text="Añadir" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deleteAll()}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          padding: 15,
          elevation: 8,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <StyledText bold="bold" variant="titleMedium" text="Borrar" />
      </TouchableOpacity>
    </View>
  );
};

export default AtScript;
