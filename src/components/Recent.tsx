import {View, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native-paper';

const Recent = () => {
  return (
    <View style={styles.recentTransactionsItems}>
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
    </View>
  );
};

export default Recent;

const styles = StyleSheet.create({
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
