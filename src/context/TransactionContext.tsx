import {BSON} from 'realm';
import {realm} from '../db';
import {Transaction} from '../db/schemas';
import {showToast} from '../utils/toastAlert';
import {TransactionContextType} from '../types/Types';
import React, {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

export const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  addTransaction: () => {},
  deleteTransaction: () => {},
});
export const TransactionProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getTransactions = (): void => {
    try {
      const transacciones = realm.objects<Transaction>('Transaction');
      setTransactions(Array.from(transacciones));
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const addTransaction = (newTransaction: any) => {
    const {category, amount, concept, cDate, file, type} = newTransaction;
    try {
      console.log(category);
      realm.write(() => {
        realm.create('Transaction', {
          _id: new BSON.ObjectId(),
          category,
          amount: parseFloat(amount),
          concept,
          cDate,
          file,
          type,
        });
      });
      showToast('success', 'Transacción agregada');
      getTransactions();
    } catch (error) {
      console.error('Error al agregar transacción:', error);
    }
  };

  const deleteTransaction = (id: BSON.ObjectId) => {
    try {
      realm.write(() => {
        const transaccion = realm.objectForPrimaryKey('Transaction', id);
        if (!transaccion) {
          return;
        }

        Alert.alert(
          'Cuidado',
          'Estas seguro que deseas eliminar esta transacción',
          [
            {
              text: 'Si',
              onPress: () => {
                realm.write(() => {
                  realm.delete(transaccion);
                  showToast('success', 'Transacción eliminada');
                });
                getTransactions();
              },
            },
            {text: 'No'},
          ],
        );
      });
      getTransactions();
    } catch (error) {
      console.error('Error al borrar la transaccion', error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{transactions, addTransaction, deleteTransaction}}>
      {children}
    </TransactionContext.Provider>
  );
};
