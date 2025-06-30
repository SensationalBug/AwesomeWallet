import {realm} from '../db';
import {
  ReportsContextType,
  GroupedTransactionsByDate,
  DateGroupsAccumulator,
  DateGroup,
} from '../types/Types';
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {Category, Transaction} from '../db/schemas';
import {TransactionContext} from './TransactionContext';

export const ReportsContext = createContext<ReportsContextType>({
  transactionsByDate: {
    byYear: [],
    byDayMonth: [],
    byMonthYear: [],
    byDayMonthYear: [],
  },
  groupByDate: () => {},
  setSelectedPeriod: () => {},
  selectedPeriod: 'byMonthYear',
  globalTransactions: {
    name: '',
    sortKey: '',
    transactions: [],
    totalAmount: 0,
    totalCredit: 0,
    totalDebit: 0,
    byCategories: [],
  },
  setGlobalTransactions: () => {},
});

export const ReportsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const {transactions} = useContext(TransactionContext);

  const [transactionsByDate, setTransactionsByDate] =
    useState<GroupedTransactionsByDate>({
      byYear: [],
      byDayMonth: [],
      byMonthYear: [],
      byDayMonthYear: [],
    });

  const [globalTransactions, setGlobalTransactions] = useState<DateGroup>({
    name: '',
    sortKey: '',
    transactions: [],
    totalAmount: 0,
    totalCredit: 0,
    totalDebit: 0,
    byCategories: [],
  });

  const [selectedPeriod, setSelectedPeriod] = useState<string>('byMonthYear');

  const groupByDate = useCallback(() => {
    try {
      const allTransactions = Array.from(transactions);

      const accByDayMonthYear: DateGroupsAccumulator = {};
      const accByDayMonth: DateGroupsAccumulator = {};
      const accByMonthYear: DateGroupsAccumulator = {};
      const accByYear: DateGroupsAccumulator = {};

      const allCategories = Array.from(realm.objects<Category>('Category'));
      const categoryMap = new Map<string, string>();
      allCategories.forEach(cat => categoryMap.set(String(cat._id), cat.name));

      allTransactions.forEach(transaction => {
        const date = new Date(transaction.cDate);
        const transactionAmount = Number(transaction.amount);
        const transactionType = transaction.type;
        const categoryId = String(transaction.category);
        const categoryName = categoryMap.get(categoryId) || 'Desconocida';

        if (isNaN(date.getTime()) || isNaN(transactionAmount)) {
          console.warn(
            `Transacción inválida (fecha o monto): ${transaction.cDate}, ${transaction.amount}. Saltando.`,
          );
          return;
        }

        // const asTransaction =
        //   typeof (transaction as unknown as Transaction).isValid === 'function'
        //     ? (transaction as unknown as Transaction)
        //     : (realm.objectForPrimaryKey<Transaction>(
        //         'Transaction',
        //         (transaction as any)._id,
        //       ) as Transaction);
        // transaction ya es un PlainTransaction, no necesitamos convertirlo ni buscarlo en Realm.

        const updateDateGroup = (
          accumulator: DateGroupsAccumulator,
          name: string,
          sortKey: string,
        ) => {
          if (!accumulator[name]) {
            accumulator[name] = {
              name,
              sortKey,
              transactions: [],
              totalAmount: 0,
              totalCredit: 0,
              totalDebit: 0,
              byCategories: [],
            };
          }
          // Usamos directamente la 'transaction' del bucle, que es un PlainTransaction
          accumulator[name].transactions.push(transaction);

          if (transactionType === 'credito') {
            accumulator[name].totalCredit += transactionAmount;
            accumulator[name].totalAmount += transactionAmount;
          } else {
            accumulator[name].totalDebit += transactionAmount;
            accumulator[name].totalAmount -= transactionAmount;
          }

          let categoryEntry = accumulator[name].byCategories.find(
            cat => cat.name === categoryName,
          );
          if (!categoryEntry) {
            categoryEntry = {name: categoryName, totalCredit: 0, totalDebit: 0};
            accumulator[name].byCategories.push(categoryEntry);
          }
          if (transactionType === 'credito') {
            categoryEntry.totalCredit += transactionAmount;
          } else {
            categoryEntry.totalDebit += transactionAmount;
          }
        };

        const dayMonthYearName = date.toLocaleString('es-DO', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        const dayMonthYearSortKey = transaction.cDate;
        updateDateGroup(
          accByDayMonthYear,
          dayMonthYearName,
          dayMonthYearSortKey,
        );

        const dayMonthName = date.toLocaleString('es-DO', {
          day: '2-digit',
          month: 'short',
        });
        const dayMonthSortKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1,
        ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        updateDateGroup(accByDayMonth, dayMonthName, dayMonthSortKey);

        const monthYearName = date.toLocaleString('es-DO', {
          month: '2-digit',
          year: 'numeric',
        });
        const monthYearSortKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1,
        ).padStart(2, '0')}`;
        updateDateGroup(accByMonthYear, monthYearName, monthYearSortKey);

        const yearName = date.getFullYear().toString();
        const yearSortKey = yearName;
        updateDateGroup(accByYear, yearName, yearSortKey);
      });

      const formattedByDayMonthYear = Object.values(accByDayMonthYear);
      const formattedByDayMonth = Object.values(accByDayMonth);
      const formattedByMonthYear = Object.values(accByMonthYear);
      const formattedByYear = Object.values(accByYear);

      // Ajustamos sortTransactions para que funcione con PlainTransaction
      const sortTransactions = (a: {cDate: string}, b: {cDate: string}) => {
        return new Date(b.cDate).getTime() - new Date(a.cDate).getTime();
      };

      [
        formattedByDayMonthYear,
        formattedByDayMonth,
        formattedByMonthYear,
        formattedByYear,
      ].forEach(groupArray => {
        groupArray.forEach(group => {
          group.transactions.sort(sortTransactions);
          group.byCategories.sort((a, b) => a.name.localeCompare(b.name));
        });
      });

      formattedByDayMonthYear.sort((a, b) =>
        b.sortKey.localeCompare(a.sortKey),
      );
      formattedByDayMonth.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
      formattedByMonthYear.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
      formattedByYear.sort((a, b) => b.sortKey.localeCompare(a.sortKey));

      setTransactionsByDate({
        byDayMonthYear: formattedByDayMonthYear,
        byDayMonth: formattedByDayMonth,
        byMonthYear: formattedByMonthYear,
        byYear: formattedByYear,
      });
    } catch (error) {
      console.log('Error al agrupar transacciones por fecha:', error);
    }
  }, [transactions]);

  useEffect(() => {
    groupByDate();
  }, [groupByDate, transactions]);

  useEffect(() => {
    const defaultEmptyDateGroup: DateGroup = {
      name: '',
      sortKey: '',
      transactions: [],
      totalAmount: 0,
      totalCredit: 0,
      totalDebit: 0,
      byCategories: [],
    };

    if (transactionsByDate.byMonthYear.length > 0) {
      // Si hay elementos, establece globalTransactions al primer elemento (el más reciente, asumiendo que ya está ordenado)
      setGlobalTransactions(transactionsByDate.byMonthYear[0]);
    } else {
      // Si no hay elementos, establece globalTransactions al objeto vacío y seguro
      setGlobalTransactions(defaultEmptyDateGroup);
    }
  }, [transactionsByDate]);

  return (
    <ReportsContext.Provider
      value={{
        transactionsByDate,
        groupByDate,
        setSelectedPeriod,
        selectedPeriod,
        globalTransactions,
        setGlobalTransactions,
      }}>
      {children}
    </ReportsContext.Provider>
  );
};
