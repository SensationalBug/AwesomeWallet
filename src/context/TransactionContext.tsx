import React, {createContext, useCallback, useEffect, useState} from 'react';
import {BSON} from 'realm';
import {realm} from '../db';
import {Alert} from 'react-native';
import {Transaction} from '../db/schemas';
import {showToast} from '../utils/toastAlert';
import {PlainTransaction, TransactionContextType} from '../types/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  addTransaction: () => Promise.resolve(),
  updateTransaction: () => Promise.resolve(),
  getTransactionByID: () => Promise.resolve(null),
  deleteTransaction: async (_transactionIds: BSON.ObjectId[]) =>
    Promise.resolve(),
  getTransactions: () => {},
  transactionSelected: [],
  setTransactionSelected: () => {},
  currency: '',
  currencySetter: () => {},
});

export const TransactionProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<PlainTransaction[]>([]);
  const [transactionSelected, setTransactionSelected] = useState<
    BSON.ObjectId[]
  >([]);

  const [currency, setCurrency] = useState<any>('RD');

  const currencySetter = (value: string) => {
    try {
      setCurrency(value);
      AsyncStorage.setItem('currency', value);
    } catch (error) {}
  };

  const getTransactions = useCallback(() => {
    try {
      const allRealmTransactions = realm
        .objects<Transaction>('Transaction')
        .sorted('cDate', true);

      const plainJSTransactions: PlainTransaction[] = allRealmTransactions.map(
        t => ({
          _id: t._id,
          concept: t.concept ?? '',
          amount: t.amount ?? 0,
          category:
            typeof t.category === 'string'
              ? new BSON.ObjectId(t.category)
              : t.category,
          cDate: t.cDate,
          type: t.type,
          file: t.file,
        }),
      );

      setTransactions(plainJSTransactions);
      console.log(
        'TransactionContext: Transacciones cargadas y convertidas a objetos JS planos. Cantidad:',
        plainJSTransactions.length,
      );
    } catch (error) {
      console.error(
        'Error al obtener transacciones (en TransactionContext):',
        error,
      );
    }
  }, []);

  const getTransactionByID = useCallback(
    async (id: BSON.ObjectId): Promise<PlainTransaction | null> => {
      try {
        const transactionByID = realm.objectForPrimaryKey<Transaction>(
          'Transaction',
          id,
        );

        if (transactionByID) {
          const plainTransaction: PlainTransaction = {
            _id: transactionByID._id,
            concept: transactionByID.concept ?? '',
            amount: transactionByID.amount ?? 0,
            category:
              typeof transactionByID.category === 'string'
                ? new BSON.ObjectId(transactionByID.category)
                : transactionByID.category,
            cDate: transactionByID.cDate,
            type: transactionByID.type,
            file: transactionByID.file,
          };
          return plainTransaction;
        }
        return null;
      } catch (error) {
        console.error('Error al obtener transacción por ID:', error);
        return null;
      }
    },
    [],
  );

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
        console.error('Error al agregar la transacción:', error);
        showToast('error', 'Error al agregar transacción');
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
        } else {
          showToast('error', 'Transacción no encontrada para actualizar.');
          reject(new Error('Transaction not found'));
        }
      } catch (error) {
        showToast('error', 'Transacción errónea.');
        console.error(error);
        reject(error);
      }
    });
  };

  const deleteTransaction = useCallback(
    async (transactionIdsToDelete: BSON.ObjectId[]): Promise<void> => {
      return new Promise((resolve, reject) => {
        const numTransactions = transactionIdsToDelete.length;
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
              onPress: () => reject(new Error('Eliminación cancelada')),
            },
            {
              text: 'Sí, eliminar',
              onPress: () => {
                try {
                  realm.write(() => {
                    transactionIdsToDelete.forEach(id => {
                      const transactionToDelete = realm.objectForPrimaryKey(
                        'Transaction',
                        id,
                      );
                      if (transactionToDelete) {
                        realm.delete(transactionToDelete);
                      } else {
                        console.warn(
                          `Transacción con ID ${id.toHexString()} no encontrada para eliminar.`,
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
    },
    [getTransactions],
  );

  useEffect(() => {
    getTransactions();

    const transactionsResults = realm.objects<Transaction>('Transaction');
    const listener = () => {
      console.log('Realm listener triggered: Transactions updated');
      getTransactions();
    };

    transactionsResults.addListener(listener);

    return () => {
      transactionsResults.removeListener(listener);
    };
  }, [getTransactions]);

  useEffect(() => {
    const getCurrency = async () => {
      try {
        const currentCurrency = await AsyncStorage.getItem('currency');
        setCurrency(currentCurrency);
      } catch (error) {
        console.error('Error al verificar biometría:', error);
      }
    };
    getCurrency();
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
        transactionSelected,
        setTransactionSelected,
        currency,
        currencySetter,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
