import React, {useContext} from 'react';
import Chart from '../components/Chart';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import StyledView from '../components/custom/StyledView';
import {ReportsContext} from '../context/ReportsContext';
import {NavigationProps, ReportsContextType} from '../types/Types';
import {CategoriesContext} from '../context/CategoriesContext';
import StyledText from '../components/custom/StyledText';
import {Text} from 'react-native-paper';

const Reports = ({navigation}: NavigationProps) => {
  const {categories} = useContext(CategoriesContext);
  const {transactionsByDate, totalCredit} = useContext(
    ReportsContext,
  ) as ReportsContextType;

  return (
    <View>
      <Text>d</Text>
    </View>
    // <StyledView>
    //   <TouchableOpacity onPress={() => console.log(transactionsByDate)}>
    //     <Text>BOTON</Text>
    //   </TouchableOpacity>
    //   {/* Transacciones por byYear */}
    //   <View style={styles.ChartView}>
    //     <View style={styles.ChartViewStyledText}>
    //       <StyledText
    //         style={styles.chartStyledText}
    //         variant="titleMedium"
    //         text="Transacciones por byYear"
    //       />
    //       <TouchableOpacity onPress={() => {}}>
    //         <StyledText
    //           style={styles.chartStyledText}
    //           variant="titleSmall"
    //           text="Ver mas ➡️"
    //         />
    //       </TouchableOpacity>
    //     </View>
    //     <Chart
    //       data={
    //         Array.isArray(transactionsByDate.byYear)
    //           ? transactionsByDate.byYear
    //           : []
    //       }
    //       height={0}
    //       maxHeight={150}
    //       maxValue={totalCredit / (categories.length / 2)}
    //     />
    //   </View>

    //   {/* Transacciones por byDayMonthYear */}
    //   <View style={styles.ChartView}>
    //     <View style={styles.ChartViewStyledText}>
    //       <StyledText
    //         style={styles.chartStyledText}
    //         variant="titleMedium"
    //         text="Transacciones por byDayMonthYear"
    //       />
    //       <TouchableOpacity onPress={() => {}}>
    //         <StyledText
    //           style={styles.chartStyledText}
    //           variant="titleSmall"
    //           text="Ver mas ➡️"
    //         />
    //       </TouchableOpacity>
    //     </View>
    //     <Chart
    //       data={
    //         Array.isArray(transactionsByDate.byDayMonthYear)
    //           ? transactionsByDate.byDayMonthYear
    //           : []
    //       }
    //       height={0}
    //       maxHeight={150}
    //       maxValue={totalCredit / (categories.length / 2)}
    //     />
    //   </View>

    //   {/* Transacciones por byMonthYear */}
    //   <View style={styles.ChartView}>
    //     <View style={styles.ChartViewStyledText}>
    //       <StyledText
    //         style={styles.chartStyledText}
    //         variant="titleMedium"
    //         text="Transacciones por byMonthYear"
    //       />
    //       <TouchableOpacity
    //         onPress={() =>
    //           navigation.navigate('TransactionsGrouped', {
    //             byYear: transactionsByDate.byYear,
    //           })
    //         }>
    //         <StyledText
    //           style={styles.chartStyledText}
    //           variant="titleSmall"
    //           text="Ver mas ➡️"
    //         />
    //       </TouchableOpacity>
    //     </View>
    //     <Chart
    //       data={
    //         Array.isArray(transactionsByDate.byMonthYear)
    //           ? transactionsByDate.byMonthYear
    //           : []
    //       }
    //       height={0}
    //       maxHeight={150}
    //       maxValue={totalCredit / (categories.length / 2)}
    //     />
    //   </View>

    //   {/* Transacciones por byDayMonth */}
    //   <View style={styles.ChartView}>
    //     <View style={styles.ChartViewStyledText}>
    //       <StyledText
    //         style={styles.chartStyledText}
    //         variant="titleMedium"
    //         text="Transacciones por byDayMonth"
    //       />
    //       <TouchableOpacity
    //         onPress={() =>
    //           navigation.navigate('TransactionsGrouped', {
    //             byYear: transactionsByDate.byYear,
    //           })
    //         }>
    //         <StyledText
    //           style={styles.chartStyledText}
    //           variant="titleSmall"
    //           text="Ver mas ➡️"
    //         />
    //       </TouchableOpacity>
    //     </View>
    //     <Chart
    //       data={
    //         Array.isArray(transactionsByDate.byDayMonth)
    //           ? transactionsByDate.byDayMonth
    //           : []
    //       }
    //       height={0}
    //       maxHeight={150}
    //       maxValue={totalCredit / (categories.length / 2)}
    //     />
    //   </View>
    // </StyledView>
  );
};

export default Reports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ChartView: {
    // borderColor: 'red',
    // borderWidth: 1,
    // alignItems: 'center',
  },
  ChartViewStyledText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  chartStyledText: {
    padding: 10,
  },
});
