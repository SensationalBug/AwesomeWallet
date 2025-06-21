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
} from 'react';
import {Transaction} from '../db/schemas';
import {TransactionContext} from './TransactionContext';

export const MetricsContext = createContext<MetricsContextType>({
  transactionsByCategories: {},
  getTransactionsGroupByCategories: () => {},
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

  const getTransactionsGroupByCategories = useCallback(() => {
    try {
      const allTransactions = Array.from(
        realm.objects<Transaction>('Transaction'),
      );
      const groupedTransactions = allTransactions.reduce(
        (acc: GroupedTransactions, transaction) => {
          const {category} = transaction;
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
      const categoryDataArray = Object.values(groupedTransactions);
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

  useEffect(() => {
    getTransactionsGroupByCategories();
  }, [getTransactionsGroupByCategories, transactions]);

  return (
    <MetricsContext.Provider
      value={{transactionsByCategories, getTransactionsGroupByCategories}}>
      {children}
    </MetricsContext.Provider>
  );
};
