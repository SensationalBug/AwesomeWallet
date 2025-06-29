import {BSON} from 'realm';
import {realm} from '../db';
import {Alert} from 'react-native';
import {Transaction} from '../db/schemas';
import {showToast} from '../utils/toastAlert';
import {TransactionContextType} from '../types/Types';
import React, {createContext, useEffect, useState} from 'react';

export const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  addTransaction: () => Promise.resolve(),
  updateTransaction: () => Promise.resolve(),
  getTransactionByID: () => Promise.resolve(null),
  deleteTransaction: async (_transactionIds: BSON.ObjectId[]) => Promise.resolve(),
  getTransactions: () => {},
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

  const addTransaction = (newTransaction: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      const {category, amount, concept, cDate, file, type} = newTransaction;
      try {
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
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateTransaction = (
    id: BSON.ObjectId,
    transactionParams: any,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const transactionByID = realm.objectForPrimaryKey(
          'Transaction',
          new BSON.ObjectId(id),
        );
        if (transactionByID) {
          realm.write(() => {
            for (const key in transactionParams) {
              if (key === 'amount') {
                transactionByID[key] = Number(transactionParams[key]);
              } else {
                transactionByID[key] = transactionParams[key];
              }
            }
          });
          showToast('success', 'Transacción editada exitosamente.');
          getTransactions();
          resolve();
        }
      } catch (error) {
        showToast('error', 'Transacción erronea.');
        console.log(error);
        reject(error);
      }
    });
  };

  const getTransactionByID = (
    id: Realm.Object[],
  ): Promise<Transaction | null> => {
    return new Promise((resolve, reject) => {
      try {
        const transactionByID = realm.objectForPrimaryKey('Transaction', id[0]);
        resolve(transactionByID as unknown as Transaction);
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteTransaction = (
    transactionIds: BSON.ObjectId[],
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const numTransactions = transactionIds.length;
      const alertMessage =
        numTransactions === 1
          ? '¿Estás seguro que deseas eliminar esta transacción?'
          : `¿Estás seguro que deseas eliminar estas ${numTransactions} transacciones?`;

      Alert.alert(
        'Cuidado',
        alertMessage,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => {
              console.log('Eliminación cancelada por el usuario.');
              reject(new Error('Eliminación cancelada')); // Rechaza si el usuario cancela
            },
          },
          {
            text: 'Sí, eliminar',
            onPress: () => {
              try {
                realm.write(() => {
                  transactionIds.forEach(transactionId => {
                    const transactionToDelete = realm.objectForPrimaryKey(
                      'Transaction',
                      transactionId,
                    );

                    if (transactionToDelete) {
                      realm.delete(transactionToDelete);
                    } else {
                      console.warn(
                        `Transacción con ID ${transactionId.toString()} no encontrada para eliminar.`,
                      );
                    }
                  });
                });
                showToast(
                  'success',
                  `${numTransactions} transacción(es) eliminada(s)`,
                );
                getTransactions();
                resolve();
              } catch (error) {
                console.error('Error al borrar la transacción(es):', error);
                showToast('error', 'Error al eliminar transacción(es)');
                reject(error);
              }
            },
          },
        ],
        {cancelable: false},
      );
    });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        getTransactionByID,
        deleteTransaction,
        getTransactions,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
