import {realm} from '../db';
import {BSON} from 'realm';
import {
  ReportsContextType,
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
import {Category, Transaction} from '../db/schemas';
import {TransactionContext} from './TransactionContext';

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
});

export const ReportsProvider: React.FC<React.PropsWithChildren<{}>> = ({
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
      byDayMonth: [],
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

      // Acumuladores para cada tipo de agrupación de fechas
      const accByDayMonthYear: DateGroupsAccumulator = {};
      const accByDayMonth: DateGroupsAccumulator = {}; // Nuevo acumulador
      const accByMonthYear: DateGroupsAccumulator = {};
      const accByYear: DateGroupsAccumulator = {};

      // Obtener las categorías para mapear _id a name
      // Asumo que tienes una forma de acceder a todas tus categorías,
      // por ejemplo, desde Realm o un contexto.
      const allCategories = Array.from(realm.objects<Category>('Category')); // Asumo un modelo 'Category'
      const categoryMap = new Map<string, string>(); // Mapa de _id a nombre de categoría
      allCategories.forEach(cat => categoryMap.set(String(cat._id), cat.name));

      allTransactions.forEach(transaction => {
        const date = new Date(transaction.cDate);
        const transactionAmount = Number(transaction.amount); // Asegúrate que es un número
        const transactionType = transaction.type;
        const categoryId = String(transaction.category); // Convertir ObjectId a string
        const categoryName = categoryMap.get(categoryId) || 'Desconocida';

        if (isNaN(date.getTime()) || isNaN(transactionAmount)) {
          console.warn(
            `Transacción inválida (fecha o monto): ${transaction.cDate}, ${transaction.amount}. Saltando.`,
          );
          return;
        }

        // Helper para actualizar un grupo de fecha (repetirá lógica)
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

          // Actualizar totales de crédito, débito y saldo
          if (transactionType === 'credito') {
            accumulator[name].totalCredit += transactionAmount;
            accumulator[name].totalAmount += transactionAmount;
          } else {
            accumulator[name].totalDebit += transactionAmount;
            accumulator[name].totalAmount -= transactionAmount;
          }

          // Actualizar sub-agrupación por categoría
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

        // --- 1. Agrupación por Día - Mes - Año ---
        const dayMonthYearName = date.toLocaleString('es-DO', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        const dayMonthYearSortKey = transaction.cDate; // 'YYYY-MM-DD'
        updateDateGroup(
          accByDayMonthYear,
          dayMonthYearName,
          dayMonthYearSortKey,
        );

        // --- 2. Agrupación por Día - Mes (Nueva) ---
        // Si necesitas el año para la unicidad de la clave, usa 'YYYY-MM-DD' como sortKey
        // Si solo quieres 'DD mes' y no te importa el año (menos probable), la lógica cambia
        // Para esta versión, lo haré por `DD mes` sin el año en el `name`,
        // pero el `sortKey` incluirá el año para evitar colisiones si hay el mismo día/mes en años diferentes
        const dayMonthName = date.toLocaleString('es-DO', {
          day: '2-digit',
          month: 'short',
        });
        // La clave de ordenación debe incluir el año para diferenciar "01 Ene 2024" de "01 Ene 2025"
        const dayMonthSortKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1,
        ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        updateDateGroup(accByDayMonth, dayMonthName, dayMonthSortKey);

        // --- 3. Agrupación por Mes - Año ---
        const monthYearName = date.toLocaleString('es-DO', {
          month: '2-digit', // Esto da "MM/YYYY" como "06/2025"
          year: 'numeric',
        });
        const monthYearSortKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1,
        ).padStart(2, '0')}`; // "YYYY-MM"
        updateDateGroup(accByMonthYear, monthYearName, monthYearSortKey);

        // --- 4. Agrupación por Año ---
        const yearName = date.getFullYear().toString();
        const yearSortKey = yearName; // "YYYY"
        updateDateGroup(accByYear, yearName, yearSortKey);
      });

      // Convertir los objetos acumuladores a arrays formateados
      const formattedByDayMonthYear = Object.values(accByDayMonthYear);
      const formattedByDayMonth = Object.values(accByDayMonth); // Nuevo array
      const formattedByMonthYear = Object.values(accByMonthYear);
      const formattedByYear = Object.values(accByYear);

      // --- Ordenación de Transacciones DENTRO de CADA GRUPO (Más Recientes Primero) ---
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
          // También ordena las categorías por nombre si quieres
          group.byCategories.sort((a, b) => a.name.localeCompare(b.name));
        });
      });

      // --- Ordenación de los GRUPOS de FECHA (Más Recientes Primero) ---
      // Usamos la sortKey para una ordenación precisa y cronológica
      formattedByDayMonthYear.sort((a, b) =>
        b.sortKey.localeCompare(a.sortKey),
      );
      formattedByDayMonth.sort((a, b) => b.sortKey.localeCompare(a.sortKey)); // Ordena by Day-Month por sortKey (YYYY-MM-DD)
      formattedByMonthYear.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
      formattedByYear.sort((a, b) => b.sortKey.localeCompare(a.sortKey));

      setTransactionsByDate({
        byDayMonthYear: formattedByDayMonthYear,
        byDayMonth: formattedByDayMonth, // Asigna el nuevo array
        byMonthYear: formattedByMonthYear,
        byYear: formattedByYear,
      });
    } catch (error) {
      console.log('Error al agrupar transacciones por fecha:', error);
    }
  }, []);

  useEffect(() => {
    groupByType();
    groupByDate();
    groupByCategories();
  }, [groupByCategories, groupByType, groupByDate, transactions]);

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
      }}>
      {children}
    </ReportsContext.Provider>
  );
};
