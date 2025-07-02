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
import StyledDropDown from '../components/custom/StyledDropDown';
import {ReportsContextType, NavigationProps, ThemeType} from '../types/Types';

const Overview = ({navigation}: NavigationProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  const {getCategoryById} = useContext(CategoriesContext);

  const {globalTransactions} = useContext(ReportsContext) as ReportsContextType;
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
              text={`RD$${formatNumber(globalTransactions.totalCredit)}`}
            />
          </StyledSurface>
          <StyledSurface height={60}>
            <StyledText variant="bodyMedium" text="Débitos:" />
            <StyledText
              bold={'bold'}
              variant="titleLarge"
              text={`RD$${formatNumber(globalTransactions.totalDebit)}`}
            />
          </StyledSurface>
        </View>
        <View style={styles.surfaceView}>
          <StyledSurface height={130}>
            <StyledText variant="titleMedium" text="Balance Total:" />
            <StyledText
              bold={'bold'}
              variant="titleLarge"
              text={`RD$${formatNumber(globalTransactions.totalAmount)}`}
            />
          </StyledSurface>
        </View>
      </View>

      {/* This month section */}
      <View style={styles.thisMonth}>
        <View>
          <StyledText
            variant="titleSmall"
            // Con este date, obtienes el nombre del mes actual filtrado
            text={globalTransactions.sortKey.split('T')[0]}
          />
          <StyledText
            variant="titleLarge"
            text={`RD$${formatNumber(globalTransactions.totalAmount)}`}
            bold={'bold'}
          />
          <StyledText variant="titleSmall" text="Este periodo +10%" />
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
      <View style={styles.chartSection}>
        {/* Asegúrate de que globalTransactions no sea null Y tenga byCategories antes de pasarlo al Chart */}
        {globalTransactions &&
        Array.isArray(globalTransactions.byCategories) &&
        globalTransactions.byCategories.length > 0 ? (
          <Chart maxHeight={110} data={globalTransactions.byCategories} />
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
      {/* Comprueba si globalTransactions existe y si tiene transacciones */}
      {globalTransactions && globalTransactions.transactions.length > 0 ? (
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
        {globalTransactions && // Comprueba que el objeto existe (aunque ya lo hace `globalTransactions`)
        Array.isArray(globalTransactions.transactions) && // ¡Asegura que es un array!
        globalTransactions.transactions.length > 0 ? ( // Y que no está vacío
          globalTransactions.transactions
            .slice(0, recent) // slice puede usarse en arrays vacíos sin problema
            .map((value: any, index: number) => {
              const {concept, amount, category, type} = value;
              const categoryObj = getCategoryById(category) as
                | {icon?: string; name?: string}
                | undefined;
              const categoryIcon = categoryObj?.icon;
              const categoryName = categoryObj?.name;

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
            })
        ) : (
          // Mensaje cuando no hay transacciones o globalTransactions es nulo/vacío
          <StyledView>
            <StyledText
              text="No hay transacciones recientes para mostrar."
              variant="bodyMedium"
            />
          </StyledView>
        )}
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
  chartSection: {height: 130},
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
