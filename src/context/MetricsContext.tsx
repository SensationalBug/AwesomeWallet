import {realm} from '../db';
import {BSON} from 'realm';
import {
  MetricsContextType,
  CategoriesContextType,
  GroupedTransactions,
  GroupedTransactionsByDate,
  DateGroupsAccumulator,
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
  transactionsByDate: {},
  groupByCategories: () => {},
  groupByType: () => {},
  groupByDate: () => {},
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

  const [transactionsByDate, setTransactionsByDate] =
    useState<GroupedTransactionsByDate>({
      byYear: [],
      byMonthYear: [],
      byDayMonthYear: [],
    });

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

      // Acumuladores para cada tipo de agrupación (ahora guardan objetos DateGroup)
      const accByYear: DateGroupsAccumulator = {};
      const accByMonthYear: DateGroupsAccumulator = {};
      const accByDayMonthYear: DateGroupsAccumulator = {};

      allTransactions.forEach(transaction => {
        // Convertir la fecha string a un objeto Date
        const date = new Date(transaction.cDate);

        if (isNaN(date.getTime())) {
          console.warn(
            `Fecha inválida para la transacción: ${transaction.cDate}. Saltando.`,
          );
          return; // Salta esta transacción si la fecha es inválida
        }

        // --- Agrupación por Año ---
        const year = date.getFullYear().toString();
        if (!accByYear[year]) {
          accByYear[year] = {name: year, transactions: []};
        }
        accByYear[year].transactions.push(transaction);

        // --- Agrupación por Mes-Año ---
        // Usar 'es-DO' para el nombre del mes para consistencia
        const monthYear = date.toLocaleString('es-DO', {
          month: 'short',
          year: 'numeric',
        });
        if (!accByMonthYear[monthYear]) {
          accByMonthYear[monthYear] = {name: monthYear, transactions: []};
        }
        accByMonthYear[monthYear].transactions.push(transaction);

        // --- Agrupación por Día-Mes-Año ---
        const dayMonthYear = date.toLocaleString('es-DO', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
        if (!accByDayMonthYear[dayMonthYear]) {
          accByDayMonthYear[dayMonthYear] = {
            name: dayMonthYear,
            transactions: [],
          };
        }
        accByDayMonthYear[dayMonthYear].transactions.push(transaction);
      });

      // Convertir los objetos acumuladores a arrays de DateGroup
      const formattedByYear = Object.values(accByYear);
      const formattedByMonthYear = Object.values(accByMonthYear);
      const formattedByDayMonthYear = Object.values(accByDayMonthYear);

      // Opcional: Si quieres ordenar las transacciones dentro de cada grupo (por cDate)
      formattedByYear.forEach(group =>
        group.transactions.sort(
          (a, b) => new Date(b.cDate).getTime() - new Date(a.cDate).getTime(),
        ),
      );
      formattedByMonthYear.forEach(group =>
        group.transactions.sort(
          (a, b) => new Date(b.cDate).getTime() - new Date(a.cDate).getTime(),
        ),
      );
      formattedByDayMonthYear.forEach(group =>
        group.transactions.sort(
          (a, b) => new Date(b.cDate).getTime() - new Date(a.cDate).getTime(),
        ),
      );

      // Opcional: Si quieres ordenar los grupos de fecha (ej. años en orden descendente)
      formattedByYear.sort((a, b) => b.name.localeCompare(a.name)); // Para años, de más reciente a más antiguo
      formattedByMonthYear.sort(
        (a, b) => new Date(b.name).getTime() - new Date(a.name).getTime(),
      ); // Para Mes-Año
      formattedByDayMonthYear.sort(
        (a, b) => new Date(b.name).getTime() - new Date(a.name).getTime(),
      ); // Para Día-Mes-Año

      setTransactionsByDate({
        byYear: formattedByYear,
        byMonthYear: formattedByMonthYear,
        byDayMonthYear: formattedByDayMonthYear,
      });
    } catch (error) {
      console.log('Error al agrupar transacciones por fecha:', error);
    }
  }, []);

  useEffect(() => {
    groupByType();
    groupByCategories();
  }, [groupByCategories, groupByType, transactions]);

  return (
    <MetricsContext.Provider
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
      }}>
      {children}
    </MetricsContext.Provider>
  );
};
