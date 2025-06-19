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
  updateTransaction: ({}) => Promise.resolve(null),
  deleteTransaction: async () => Promise.resolve(),
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

  const updateTransaction = (
    id: Realm.Object[],
    updates: Partial<Transaction>,
  ): Promise<Transaction | null> => {
    return new Promise((resolve, reject) => {
      console.log(id, updates, resolve, reject);
      // try {
      //   const transactionToUpdate = realm.objectForPrimaryKey(
      //     'Transaction',
      //     id[0],
      //   );
      //   if (transactionToUpdate) {
      //     realm.write(() => {
      //       Object.keys(updates).forEach(key => {
      //         transactionToUpdate[key] = updates[key as keyof Transaction];
      //       });
      //     });
      //     showToast('success', 'Transacción actualizada');
      //     getTransactions();
      //     resolve(transactionToUpdate as unknown as Transaction);
      //   } else {
      //     resolve(null);
      //   }
      // } catch (error) {
      //   console.error('Error al actualizar transacción:', error);
      //   reject(error);
      // }
    });
  };

  const deleteTransaction = (
    transactionSelected: Realm.Object[],
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const numTransactions = transactionSelected.length;
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
                  transactionSelected.forEach(id => {
                    const transactionToDelete = realm.objectForPrimaryKey(
                      'Transaction',
                      id, // Aquí pasas el ID directamente
                    );

                    if (transactionToDelete) {
                      realm.delete(transactionToDelete);
                    } else {
                      console.warn(
                        `Transacción con ID ${id.toString()} no encontrada para eliminar.`,
                      );
                    }
                  });
                });
                showToast(
                  'success',
                  `${numTransactions} transacción(es) eliminada(s)`,
                );
                getTransactions();
                resolve(); // Resuelve la promesa si todo fue exitoso
              } catch (error) {
                console.error('Error al borrar la transacción(es):', error);
                showToast('error', 'Error al eliminar transacción(es)');
                reject(error); // Rechaza la promesa si ocurre un error en Realm
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
        deleteTransaction,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
