import React, {useContext} from 'react';
import {themes} from '../../styles/Theme';
import {Tooltip} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import StyledText from '../custom/StyledText';
import {formatNumber} from '../../utils/formatNumber';
import {ThemesContext} from '../../context/ThemesContext';
import {ChartBarProps, ThemeType} from '../../types/Types';
import {TransactionContext} from '../../context/TransactionContext';

const ChartBar = ({
  text,
  debit,
  credit,
  tAmount,
  maxHeight,
  cHeight,
  dHeight,
  showTamount = true,
}: ChartBarProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  const {currency} = useContext(TransactionContext);

  return (
    <View style={styles.container}>
      <Tooltip
        enterTouchDelay={250}
        leaveTouchDelay={1000}
        title={`Debitos: ${currency}$${String(formatNumber(debit))}`}>
        <View
          style={[
            styles.content,
            styles.border,
            {
              maxHeight,
              height: dHeight,
              backgroundColor: debit ? theme.chartBarNegativeColor : undefined,
            },
          ]}
        />
      </Tooltip>
      <Tooltip
        enterTouchDelay={250}
        leaveTouchDelay={1000}
        title={`Creditos: ${currency}$${String(formatNumber(credit))}`}>
        <View
          style={[
            styles.content,
            credit && !debit ? styles.border : null,
            {
              maxHeight,
              height: cHeight,
              backgroundColor: credit ? theme.chartBarColor : undefined,
            },
          ]}
        />
      </Tooltip>
      {showTamount ? (
        <Tooltip
          enterTouchDelay={250}
          leaveTouchDelay={1000}
          title={`Monto total: ${currency}$${String(formatNumber(tAmount))}`}>
          <View style={styles.label}>
            <StyledText text={text} variant="labelLarge" />
          </View>
        </Tooltip>
      ) : (
        <View style={styles.label}>
          <StyledText text={text} variant="labelLarge" />
        </View>
      )}
    </View>
  );
};

export default ChartBar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  border: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  content: {
    width: 60,
    minHeight: 1,
  },
  label: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
