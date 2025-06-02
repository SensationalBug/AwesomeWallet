import React, {useContext} from 'react';
import Recent from '../components/Recent';
import {Surface} from 'react-native-paper';
import MyChart from '../components/Charts';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

import {themes} from '../styles/Theme';
import StyledText from '../components/custom/StyledText';
import {ThemesContext, ThemeType} from '../context/ThemesContext';

import type { StackNavigationProp } from '@react-navigation/stack';

type OverviewProps = {
  navigation: StackNavigationProp<any, any>;
};

const Overview = ({navigation}: OverviewProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themes[currentThemeName.currentThemeName].background,
        },
      ]}>
      {/* Surface components for displaying balance */}
      <View style={styles.surfaceContainer}>
        <Surface
          elevation={2}
          style={[
            styles.surface,
            {
              backgroundColor:
                themes[currentThemeName.currentThemeName].iconBackground,
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
              backgroundColor:
                themes[currentThemeName.currentThemeName].iconBackground,
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
              backgroundColor:
                themes[currentThemeName.currentThemeName].iconBackground,
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
      </View>

      {/* Recent transactions items */}
      <ScrollView>
        <Recent />
        <Recent />
        <Recent />
        <Recent />
      </ScrollView>
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
    paddingHorizontal: 10,
  },
});
