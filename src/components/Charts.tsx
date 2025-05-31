import React, {useContext} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {ThemesContext, ThemeType} from '../context/ThemesContext';
import {themes} from '../styles/Theme';

const screenWidth = Dimensions.get('window').width;

export default function MyChart() {
  const currentThemeName = useContext(ThemesContext) as ThemeType;

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [80, 100, 30, 45, 45, 80],
      },
    ],
  };

  const chartStyle = {
    marginVertical: 8,
    borderRadius: 16,
  };

  return (
    <View style={viewStyle.container}>
      <BarChart
        data={data}
        width={screenWidth - 20}
        height={220}
        yAxisLabel=""
        fromZero
        yAxisSuffix={''}
        style={chartStyle}
        withInnerLines={false}
        showValuesOnTopOfBars={false}
        chartConfig={{
          decimalPlaces: 0,
          barPercentage: 0.6,
          fillShadowGradientOpacity: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: () => themes[currentThemeName.currentThemeName].text,
          fillShadowGradient: themes[currentThemeName.currentThemeName].text,
          backgroundColor:
            themes[currentThemeName.currentThemeName].iconBackground,
          backgroundGradientTo:
            themes[currentThemeName.currentThemeName].iconBackground,
          backgroundGradientFrom:
            themes[currentThemeName.currentThemeName].iconBackground,
        }}
      />
    </View>
  );
}

const viewStyle = StyleSheet.create({container: {alignItems: 'center'}});
// This style is used to center the chart within its parent container
