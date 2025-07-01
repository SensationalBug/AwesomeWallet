import {themes} from '../styles/Theme';
import React, {useContext} from 'react';
import StyledText from './custom/StyledText';
import {ThemesContext} from '../context/ThemesContext';
import {useNavigation} from '@react-navigation/native';
import {ReportsHeaderProps, ThemeType} from '../types/Types';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

const ReportsHeader = ({
  title,
  titleButton,
  goTo,
  navigationaParams,
}: ReportsHeaderProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  const navigation = useNavigation<any>();
  return (
    <View
      style={[
        styles.ChartViewStyledText,
        {backgroundColor: theme.iconBackground},
      ]}>
      <StyledText
        style={styles.chartStyledText}
        variant="titleMedium"
        text={title}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(goTo, navigationaParams)}>
        <StyledText
          style={styles.chartStyledText}
          variant="titleSmall"
          text={titleButton}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ReportsHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ChartView: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  ChartViewStyledText: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartStyledText: {
    padding: 10,
  },
});
