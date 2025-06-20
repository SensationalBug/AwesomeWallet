import {themes} from '../styles/Theme';
import React, {useContext} from 'react';
import {ThemeType} from '../types/Types';
import {ThemesContext} from '../context/ThemesContext';
import {View, Dimensions, StyleSheet, ScrollView} from 'react-native';
import StyledButton from './custom/StyledButton';
import ChartBar from './charts/ChartBar';
// import {themes} from '../styles/Theme'; // Ensure themes is imported - REMOVED DUPLICATE

const screenWidth = Dimensions.get('window').width;

export default function MyChart() {
  const {currentThemeName} = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName]; // Get the full theme object

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'ddd', 'eee'],
    datasets: [
      {
        data: [80, 100, 30, 45, 45, 80, 90, 30],
      },
    ],
  };

  const chartStyle = {
    paddingRight: 0,
    borderRadius: 10,
    marginVertical: 5,
  };

  return (
    <ScrollView horizontal style={viewStyle.container}>
      {/* <BarChart
        data={data}
        width={screenWidth - 20}
        height={180}
        yAxisLabel=""
        fromZero
        yAxisSuffix=""
        style={chartStyle}
        withInnerLines={false}
        withHorizontalLabels={false}
        showValuesOnTopOfBars={false}
        chartConfig={{
          decimalPlaces: 0,
          barPercentage: 1,
          color: () => theme.text,
          labelColor: () => theme.text,
          fillShadowGradient: theme.text,
          backgroundColor: theme.iconBackground,
          backgroundGradientTo: theme.iconBackground,
          backgroundGradientFrom: theme.iconBackground,
        }}
      /> */}
      <ChartBar />
      <ChartBar />
      <ChartBar />
    </ScrollView>
  );
}

const viewStyle = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  },
});
// This style is used to center the chart within its parent container
