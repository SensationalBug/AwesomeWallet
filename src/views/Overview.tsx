import React, {useContext} from 'react';
import Chart from '../components/Chart';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {themes} from '../styles/Theme';
import {formatNumber} from '../utils/formatNumber';
import {ThemesContext} from '../context/ThemesContext';
import StyledText from '../components/custom/StyledText';
import StyledView from '../components/custom/StyledView';
import {ReportsContext} from '../context/ReportsContext';
import StyledButton from '../components/custom/StyledButton';
import {CategoriesContext} from '../context/CategoriesContext';
import StyledSurface from '../components/custom/StyledSurface';
import {TransactionContext} from '../context/TransactionContext';
import StyledDropDown from '../components/custom/StyledDropDown';
import {ReportsContextType, NavigationProps, ThemeType} from '../types/Types';
import AtScript from '../utils/AtScript';

const Overview = ({navigation}: NavigationProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  const {transactions} = useContext(TransactionContext);
  const {getCategoryById, categories} = useContext(CategoriesContext);

  const {
    transactionsByDate,
    transactionsByCategories,
    totalCredit,
    totalDebit,
    totalBalance,
  } = useContext(ReportsContext) as ReportsContextType;
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
          <StyledSurface height={60}>
            <StyledText variant="bodyMedium" text="Créditos:" />
            <StyledText
              bold={'bold'}
              variant="titleLarge"
              text={`RD$${formatNumber(totalCredit)}`}
            />
            {}
          </StyledSurface>
          <StyledSurface height={60}>
            <StyledText variant="bodyMedium" text="Débitos:" />
            <StyledText
              bold={'bold'}
              variant="titleLarge"
              text={`RD$${formatNumber(totalDebit)}`}
            />
          </StyledSurface>
        </View>
        <View style={styles.surfaceView}>
          <StyledSurface height={130}>
            <StyledText variant="titleMedium" text="Balance Total:" />
            <StyledText
              bold={'bold'}
              variant="titleLarge"
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
        <AtScript />
        <TouchableOpacity
          onPress={() => console.log(transactionsByDate.byMonthYear)}
          // onPress={() => navigation.navigate('AddTransaction')}
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
        {transactionsByDate.byMonthYear[0] ? (
          <Chart
            data={
              Array.isArray(transactionsByDate.byMonthYear[2].byCategories)
                ? transactionsByDate.byMonthYear[2]
                : []
            }
            height={0}
            maxHeight={110}
          />
        ) : (
          <StyledView contentContainerStyle={styles.noTransactionView}>
            <StyledText variant="titleLarge" text="Aún no tienes débitos 😐." />
            <StyledText
              variant="titleMedium"
              text="Se mostrarán aquí cuando agregues alguno."
            />
          </StyledView>
        )}
      </View>

      {/* Recent transactions section */}
      {Object.keys(transactions).length ? (
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
      ) : null}

      {/* Recent transactions items */}
      <StyledView>
        {transactions.slice(-recent).map((value: any, index: number) => {
          const {concept, amount, category, type} = value;
          const categoryIcon = (
            getCategoryById(category) as unknown as {icon?: string}
          )?.icon;
          const categoryName = (
            getCategoryById(category) as unknown as {name?: string}
          )?.name;
          return (
            <StyledButton
              key={index}
              title={concept}
              iconName={categoryIcon}
              subTitle={categoryName}
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
    padding: 5,
  },
  surfaceContainer: {
    flexDirection: 'row',
  },
  surfaceView: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thisMonth: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addTransactionButton: {
    padding: 15,
    elevation: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartSection: {height: 130, borderWidth: 1, borderColor: 'red'},
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
