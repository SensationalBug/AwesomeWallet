import React, {useContext} from 'react';
import {Surface} from 'react-native-paper';
import MyChart from '../components/Charts';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {themes} from '../styles/Theme';
import {ThemesContext} from '../context/ThemesContext';
import StyledText from '../components/custom/StyledText';
import {NavigationProps, ThemeType} from '../types/Types';
import StyledView from '../components/custom/StyledView';
import StyledButton from '../components/custom/StyledButton';
import {TransactionContext} from '../context/TransactionContext';
import StyledDropDown from '../components/custom/StyledDropDown';

const Overview = ({navigation}: NavigationProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  const {transactions} = useContext(TransactionContext);
  const [recent, setRecent] = React.useState<number>(3);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}>
      {/* Surface components for displaying balance */}
      <View style={styles.surfaceContainer}>
        <Surface
          elevation={2}
          style={[
            styles.surface,
            {
              backgroundColor: theme.iconBackground,
            },
          ]}>
          <StyledText variant="titleMedium" text="Balance:" />
          <StyledText variant="titleLarge" text="RD$10,000" bold={'bold'} />
        </Surface>
        <Surface
          elevation={2}
          style={[
            styles.surface,
            {
              backgroundColor: theme.iconBackground,
            },
          ]}>
          <StyledText variant="titleMedium" text="Balance:" />
          <StyledText variant="titleLarge" text="RD$10,000" bold={'bold'} />
        </Surface>
      </View>

      {/* This month section */}
      <View style={styles.thisMonth}>
        <View>
          <StyledText variant="titleSmall" text="Este mes" />
          <StyledText variant="titleLarge" text="RD$100.000.00" bold={'bold'} />
          <StyledText variant="titleSmall" text="Este mes +10%" />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTransaction')}
          style={[
            styles.addTransactionButton,
            {
              backgroundColor: theme.iconBackground,
            },
          ]}>
          <StyledText
            bold="bold"
            variant="titleMedium"
            text="Añadir Transacción"
          />
        </TouchableOpacity>
      </View>

      {/* Chart section */}
      <MyChart />

      {/* Recent transactions section */}
      <View style={styles.recentTransactions}>
        <StyledText variant="headlineMedium" text="Transacciones recientes" />
        <StyledDropDown
          data={[
            {label: '3', value: 3},
            {label: '5', value: 5},
            {label: '10', value: 10},
          ]}
          value={recent}
          placeholder={''}
          width={60}
          onChange={(item: {label: string; value: string}) =>
            setRecent(Number(item.value))
          }
        />
      </View>

      {/* Recent transactions items */}
      <StyledView>
        {transactions.slice(-recent).map((value: any, index: number) => {
          const {concept, amount, category, cDate, type} = value;
          return (
            <StyledButton
              key={index}
              title={concept}
              iconName={category}
              subTitle={cDate}
              amount={amount}
              type={type}
            />
          );
        })}
      </StyledView>
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  surfaceContainer: {
    height: '15%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  surface: {
    width: '48%',
    height: '90%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  thisMonth: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addTransactionButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentTransactions: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
});
