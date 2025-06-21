import React, {useContext} from 'react';
import Chart from '../components/Chart';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {themes} from '../styles/Theme';
import {formatNumber} from '../utils/formatNumber';
import {ThemesContext} from '../context/ThemesContext';
import StyledText from '../components/custom/StyledText';
import StyledView from '../components/custom/StyledView';
import {MetricsContext} from '../context/MetricsContext';
import StyledButton from '../components/custom/StyledButton';
import {CategoriesContext} from '../context/CategoriesContext';
import StyledSurface from '../components/custom/StyledSurface';
import {TransactionContext} from '../context/TransactionContext';
import StyledDropDown from '../components/custom/StyledDropDown';
import {MetricsContextType, NavigationProps, ThemeType} from '../types/Types';

const Overview = ({navigation}: NavigationProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  const {transactions} = useContext(TransactionContext);
  const {getCategoryById} = useContext(CategoriesContext);
  const {transactionsByCategories, totalCredit, totalDebit, totalBalance} =
    useContext(MetricsContext) as MetricsContextType;
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
        <View style={styles.surfaceView}>
          <StyledSurface>
            <StyledText variant="bodyMedium" text="Total Crédito:" />
            <StyledText
              bold={'bold'}
              variant="titleLarge"
              text={`RD$${formatNumber(totalCredit)}`}
            />
            {}
          </StyledSurface>
          <StyledSurface>
            <StyledText variant="bodyMedium" text="Total Débito:" />
            <StyledText
              bold={'bold'}
              variant="titleLarge"
              text={`RD$${formatNumber(totalDebit)}`}
            />
          </StyledSurface>
        </View>
        <View style={styles.surfaceView}>
          <StyledSurface height={'100%'} alignItems="center">
            <StyledText variant="titleMedium" text="Balance Total:" />
            <StyledText
              bold={'bold'}
              variant="headlineSmall"
              text={`RD$${formatNumber(totalBalance)}`}
            />
          </StyledSurface>
        </View>
      </View>

      {/* This month section */}
      <View style={styles.thisMonth}>
        <View>
          <StyledText variant="titleSmall" text="Este mes" />
          <StyledText variant="titleLarge" text="RD$100.000.00" bold={'bold'} />
          <StyledText variant="titleSmall" text="Este mes +10%" />
        </View>
        <TouchableOpacity
          // onPress={() => console.log(totalBalance, totalCredit, totalDebit)}
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
      <View style={styles.chartSection}>
        {!transactions ? (
          <StyledView contentContainerStyle={styles.noTransactionView}>
            <StyledText
              variant="titleLarge"
              text="Aún no tienes transacciones 😐"
            />
            <StyledText
              variant="titleMedium"
              text='Pulsa "Añadir Transacción" para agregar alguna.'
            />
          </StyledView>
        ) : (
          <Chart
            data={
              Array.isArray(transactionsByCategories)
                ? transactionsByCategories
                : []
            }
          />
        )}
      </View>

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
          const categoryIcon = (
            getCategoryById(category) as unknown as {icon?: string}
          )?.icon;
          return (
            <StyledButton
              key={index}
              title={concept}
              iconName={categoryIcon}
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
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  surfaceView: {
    width: '50%',
    alignItems: 'center',
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
  chartSection: {height: 180},
  noTransactionView: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentTransactions: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
});
