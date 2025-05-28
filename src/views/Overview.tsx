import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Surface, Text} from 'react-native-paper';
import MyChart from '../components/Charts';
import Recent from '../components/Recent';

const Overview = () => {
  return (
    <View style={styles.container}>
      {/* Header with title and add button */}
      <View style={styles.header}>
        <Text style={styles.title}>Overview</Text>
        <TouchableOpacity>
          <Icon name="add" size={35} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Surface components for displaying balance */}
      <View style={styles.surfaceContainer}>
        <Surface elevation={2} style={styles.surface}>
          <Text variant="titleMedium">Balance:</Text>
          <Text style={styles.titleLargeText} variant="titleLarge">
            RD$10,000
          </Text>
        </Surface>
        <Surface elevation={2} style={styles.surface}>
          <Text variant="titleMedium">Balance:</Text>
          <Text style={styles.titleLargeText} variant="titleLarge">
            RD$10,000
          </Text>
        </Surface>
      </View>

      {/* This month section */}
      <View style={styles.thisMonth}>
        <Text variant="titleSmall">Este mes</Text>
        <Text style={styles.titleLargeText} variant="titleLarge">
          RD$100.000.00
        </Text>
        <Text variant="titleSmall">
          Este mes <Text style={styles.titleMediumPercentage}>+10%</Text>
        </Text>
      </View>

      {/* Chart section */}
      <View style={styles.myChartSection}>
        <MyChart />
      </View>

      {/* Recent transactions section */}
      <View style={styles.recentTransactions}>
        <Text style={styles.titleLargeText} variant="headlineMedium">
          Transacciones recientes
        </Text>
      </View>

      {/* Recent transactions items */}
      <Recent />
      <Recent />
      <Recent />
      <Recent />
      {/* <View style={styles.recentTransactionsItems}>
        <View style={styles.recentTransactionIcon}>
          <Icon name="add" size={35} color="#000" />
        </View>
        <View style={styles.recentTransactionView}>
          <View>
            <Text variant="titleMedium">Supermercado</Text>
            <Text variant="titleSmall">Comida</Text>
          </View>
          <View>
            <Text variant="titleSmall">-RD$50.00</Text>
          </View>
        </View>
      </View> */}
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    // backgroundColor: '#101323',
  },
  header: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  surfaceContainer: {
    height: '15%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'space-evenly',
  },
  surface: {
    width: '45%',
    height: '90%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  thisMonth: {
    padding: 20,
    backgroundColor: 'yellow',
    justifyContent: 'space-evenly',
  },
  titleLargeText: {
    fontWeight: 'bold',
  },
  titleMediumPercentage: {
    color: 'green',
    fontWeight: 'bold',
  },
  myChartSection: {
    alignItems: 'center',
  },
  recentTransactions: {
    paddingHorizontal: 10,
  },
  recentTransactionsItems: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#f0f0f0',
    justifyContent: 'flex-start',
  },
  recentTransactionIcon: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  recentTransactionView: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
});
