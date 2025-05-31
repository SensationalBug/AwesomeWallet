import {themes} from '../styles/Theme';
import React, {useContext} from 'react';
import StyledText from './custom/StyledText';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemesContext, ThemeType} from '../context/ThemesContext';

const Recent = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;

  return (
    <View style={styles.recentTransactionsItems}>
      <View
        style={[
          styles.recentTransactionIcon,
          {
            backgroundColor:
              themes[currentThemeName.currentThemeName].iconBackground,
          },
        ]}>
        <Icon
          name="add"
          size={35}
          color={themes[currentThemeName.currentThemeName].text}
        />
      </View>
      <View style={styles.recentTransactionView}>
        <View>
          <StyledText variant="titleMedium" text="Supermercado" />
          <StyledText variant="titleSmall" text="Comida" label/>
        </View>
        <View>
          <StyledText variant="titleSmall" text="-RD$50.00" />
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
    justifyContent: 'flex-start',
  },
  recentTransactionIcon: {
    padding: 5,
    borderRadius: 10,
  },
  recentTransactionView: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
});
