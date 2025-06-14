import {BSON} from 'realm';
import {realm} from '../db';
import {Transaction} from '../db/schemas';
import {showToast} from '../utils/toastAlert';
import {TransactionContextType} from '../types/Types';
import React, {createContext, useEffect, useState} from 'react';

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
      console.log(transacciones);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  // properties: {
  //     _id: 'objectId',
  //     category: 'Category',
  //     amount: 'double',
  //     concept: 'string?',
  //     date: 'date',
  //     file: 'string?',
  //     type: 'string', // puedes usar enum-like validación manual
  //   },

  const addTransaction = (newTransaction: Transaction) => {
    const {category, amount, concept, date, file, type} = newTransaction;
    try {
      console.log(category);
      realm.write(() => {
        realm.create('Transaction', {
          _id: new BSON.ObjectId(),
          category,
          amount,
          concept,
          date,
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
  const deleteTransaction = () => {
    console.log('deleteTransaction called');
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
