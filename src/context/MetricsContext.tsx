import {realm} from '../db';
import {BSON} from 'realm';
import {
  MetricsContextType,
  CategoriesContextType,
  GroupedTransactions,
} from '../types/Types';
import {CategoriesContext} from './CategoriesContext';
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import {Transaction} from '../db/schemas';
import {TransactionContext} from './TransactionContext';

export const MetricsContext = createContext<MetricsContextType>({
  transactionsByCategories: {},
  transactionsByType: {},
  groupByCategories: () => {},
  groupByType: () => {},
  totalCredit: 0,
  totalDebit: 0,
  totalBalance: 0,
});

export const MetricsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const {transactions} = useContext(TransactionContext);
  const {getCategoryById} = useContext(
    CategoriesContext,
  ) as CategoriesContextType;

  const [transactionsByCategories, setTransactionsByCategories] = useState<
    Array<{name: string; amount: number}>
  >([]);

  const [transactionsByType, setTransactionsByType] = useState<
    Array<{name: string; amount: number}>
  >([
    {name: '', amount: 0},
    {name: '', amount: 0},
  ]);

  const totalCredit = useMemo(() => {
    const creditEntry = transactionsByType.find(
      item => item.name === 'credito',
    );
    return creditEntry ? creditEntry.amount : 0;
  }, [transactionsByType]);

  const totalDebit = useMemo(() => {
    const debitEntry = transactionsByType.find(item => item.name === 'debito');
    return debitEntry ? debitEntry.amount : 0;
  }, [transactionsByType]);

  const totalBalance = totalCredit - totalDebit;

  const groupByCategories = useCallback(() => {
    try {
      const allTransactions = Array.from(
        realm.objects<Transaction>('Transaction'),
      );
      const groupedByCategory = allTransactions.reduce(
        (acc: GroupedTransactions, transaction) => {
          const {category, type} = transaction;
          console.log(type);
          const categoryObj = getCategoryById(new BSON.ObjectId(category)) as
            | {name: string}
            | undefined;
          const categoryName = categoryObj?.name;

          if (categoryName) {
            if (!acc[categoryName]) {
              acc[categoryName] = {
                name: categoryName,
                totalAmount: 0,
              };
            }
            acc[categoryName].totalAmount += Number(transaction.amount);
          }
          return acc;
        },
        {},
      );
      const categoryDataArray = Object.values(groupedByCategory);
      const formattedData: Array<{name: string; amount: number}> =
        categoryDataArray.map(item => ({
          name: item.name,
          amount: item.totalAmount,
        }));
      setTransactionsByCategories(formattedData);
    } catch (error) {
      console.log(error);
    }
  }, [getCategoryById]);

  const groupByType = useCallback(() => {
    try {
      const allTransactions = Array.from(
        realm.objects<Transaction>('Transaction'),
      );

      const groupedByType = allTransactions.reduce(
        (acc: GroupedTransactions, transaction) => {
          const typeName = transaction.type;
          if (typeName) {
            if (!acc[typeName]) {
              acc[typeName] = {
                name: typeName,
                totalAmount: 0,
              };
            }
            acc[typeName].totalAmount += Number(transaction.amount);
          }
          return acc;
        },
        {},
      );

      const typeDataArray = Object.values(groupedByType) as Array<{
        name: string;
        totalAmount: number;
      }>;

      const formattedData = typeDataArray.map(item => ({
        name: item.name,
        amount: item.totalAmount,
      }));

      setTransactionsByType(formattedData);
    } catch (error) {
      console.log('Error al agrupar transacciones por tipo:', error);
    }
  }, []);

  useEffect(() => {
    groupByCategories();
    groupByType();
  }, [groupByCategories, groupByType, transactions]);

  return (
    <MetricsContext.Provider
      value={{
        transactionsByCategories,
        transactionsByType,
        groupByCategories,
        groupByType,
        totalCredit,
        totalDebit,
        totalBalance,
      }}>
      {children}
    </MetricsContext.Provider>
  );
};
