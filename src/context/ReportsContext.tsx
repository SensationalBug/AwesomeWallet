import {realm} from '../db';
import {BSON} from 'realm';
import {
  ReportsContextType,
  CategoriesContextType,
  GroupedTransactions,
  GroupedTransactionsByDate,
  DateGroupsAccumulator,
  DateGroup,
  // Asegúrate de importar DateGroup si no lo estás haciendo ya
  // Y cualquier otro tipo relacionado con `globalTransactions`
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
import {Category, Transaction} from '../db/schemas';
import {TransactionContext} from './TransactionContext';

// Define un tipo más específico para globalTransactions si es posible,
// en lugar de `any`. Si esperas un DateGroup, defínelo así.
// Por ejemplo:
// interface DateGroup { /* ... definición de DateGroup ... */ }

export const ReportsContext = createContext<ReportsContextType>({
  transactionsByCategories: {},
  transactionsByType: {},
  transactionsByDate: {
    byYear: [],
    byDayMonth: [],
    byMonthYear: [],
    byDayMonthYear: [],
  },
  groupByCategories: () => {},
  groupByType: () => {},
  groupByDate: () => {},
  totalCredit: 0,
  totalDebit: 0,
  totalBalance: 0,
  setSelectedPeriod: () => {},
  selectedPeriod: 'byMonthYear', // Asegúrate de que el valor inicial coincida con el useState
  globalTransactions: {
    name: '',
    sortKey: '',
    transactions: [],
    totalAmount: 0,
    totalCredit: 0,
    totalDebit: 0,
    byCategories: [],
  }, // <-- Inicializa con null o un objeto DateGroup vacío
  setGlobalTransactions: () => {},
});

export const ReportsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const {getCategoryById} = useContext(
    CategoriesContext,
  ) as CategoriesContextType;
  const {transactions} = useContext(TransactionContext);

  const [transactionsByCategories, setTransactionsByCategories] = useState<
    Array<{name: string; amount: number}>
  >([]);

  const [transactionsByType, setTransactionsByType] = useState<
    Array<{name: string; amount: number}>
  >([
    {name: '', amount: 0},
    {name: '', amount: 0},
  ]);

  const [transactionsByDate, setTransactionsByDate] =
    useState<GroupedTransactionsByDate>({
      byYear: [],
      byDayMonth: [],
      byMonthYear: [],
      byDayMonthYear: [],
    });

  // ¡IMPORTANTE! Inicializa globalTransactions con null o un valor seguro.
  // Será actualizado en un useEffect después de que transactionsByDate esté listo.
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
          if (type === 'debito') {
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

  const groupByDate = useCallback(() => {
    try {
      const allTransactions = Array.from(
        realm.objects<Transaction>('Transaction'),
      );
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

      const sortTransactions = (a: Transaction, b: Transaction) => {
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
  }, []); // No dependencies needed

  // useEffect para ejecutar las agrupaciones iniciales y luego establecer globalTransactions
  useEffect(() => {
    // Estas funciones se ejecutan cuando el Provider se monta por primera vez
    // Y cada vez que 'transactions' cambian.
    groupByType();
    groupByDate();
    groupByCategories();
  }, [groupByCategories, groupByType, groupByDate, transactions]);

  // Nuevo useEffect para inicializar globalTransactions una vez que transactionsByDate tenga datos
  useEffect(() => {
    setGlobalTransactions(transactionsByDate.byMonthYear[0]);
  }, [transactionsByDate]); // Depende de transactionsByDate para que se ejecute cuando esté listo

  return (
    <ReportsContext.Provider
      value={{
        transactionsByCategories,
        transactionsByType,
        transactionsByDate,
        groupByCategories,
        groupByType,
        groupByDate,
        totalCredit,
        totalDebit,
        totalBalance,
        setSelectedPeriod,
        selectedPeriod,
        globalTransactions,
        setGlobalTransactions,
      }}>
      {children}
    </ReportsContext.Provider>
  );
};
