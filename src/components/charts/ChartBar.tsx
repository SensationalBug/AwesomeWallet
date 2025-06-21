import React, {useContext} from 'react';
import {Tooltip} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import StyledText from '../custom/StyledText';
import {ChartBarProps, ThemeType} from '../../types/Types';
import {formatNumber} from '../../utils/formatNumber';
import {ThemesContext} from '../../context/ThemesContext';
import {themes} from '../../styles/Theme';

const ChartBar = ({height, text}: ChartBarProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  return (
    <View style={styles.container}>
      <Tooltip
        enterTouchDelay={250}
        leaveTouchDelay={1000}
        title={`RD$${String(formatNumber((height / 100) * 150))}`}>
        <View
          style={[
            styles.content,
            {height, backgroundColor: theme.chartBarColor},
          ]}
        />
      </Tooltip>
      <View style={styles.label}>
        <StyledText text={text} variant="labelLarge" />
      </View>
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
  content: {
    width: 70,
    maxHeight: 150,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  label: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
