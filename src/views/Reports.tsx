import React, {useContext} from 'react';
import Chart from '../components/Chart';
import {View, StyleSheet} from 'react-native';
import ReportsHeader from '../components/ReportsHeader';
import StyledView from '../components/custom/StyledView';
import {ReportsContext} from '../context/ReportsContext';
import {NavigableGroupedTransactions, NavigableTransaction, ReportsContextType} from '../types/Types';

const Reports = () => {
  const {transactionsByDate} = useContext(ReportsContext) as ReportsContextType;

  const prepareDataForNavigation = (
    data: Array<{name: string; transactions: any[]}>,
  ): NavigableGroupedTransactions[] => {
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map(group => ({
      name: group.name,
      transactions: group.transactions.map(
        (t): NavigableTransaction => ({
          _id: t._id.toHexString(),
          concept: t.concept,
          amount: t.amount,
          category: t.category ? t.category.toHexString() : '',
          cDate: t.cDate,
          type: t.type,
          file: t.file,
        }),
      ),
    }));
  };

  return (
    <StyledView contentContainerStyle={styles.container}>
      {/* Transacciones por byMonthYear */}
      <View style={styles.ChartView}>
        <ReportsHeader
          goTo="TransactionsGrouped"
          title="Transacciones por Mes"
          titleButton="Ver mas ➡️"
          navigationaParams={prepareDataForNavigation(
            transactionsByDate.byMonthYear,
          )}
        />
        <Chart
          maxHeight={150}
          data={
            Array.isArray(transactionsByDate.byMonthYear)
              ? transactionsByDate.byMonthYear
              : []
          }
        />
      </View>

      {/* Transacciones por byDayMonthYear */}
      <View style={styles.ChartView}>
        <ReportsHeader
          goTo="TransactionsGrouped"
          title="Transacciones por Dia"
          titleButton="Ver mas ➡️"
          navigationaParams={prepareDataForNavigation(
            transactionsByDate.byDayMonthYear,
          )}
        />
        <Chart
          maxHeight={150}
          data={
            Array.isArray(transactionsByDate.byDayMonthYear)
              ? transactionsByDate.byDayMonthYear
              : []
          }
        />
      </View>

      {/* Transacciones por byYear */}
      <View style={styles.ChartView}>
        <ReportsHeader
          goTo="TransactionsGrouped"
          title="Transacciones por Anio"
          titleButton="Ver mas ➡️"
          navigationaParams={prepareDataForNavigation(
            transactionsByDate.byYear,
          )}
        />
        <Chart
          maxHeight={150}
          data={
            Array.isArray(transactionsByDate.byYear)
              ? transactionsByDate.byYear
              : []
          }
        />
      </View>
    </StyledView>
  );
};

export default Reports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ChartView: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  ChartViewStyledText: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartStyledText: {
    padding: 10,
  },
});
