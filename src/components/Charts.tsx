import {themes} from '../styles/Theme';
import React, {useContext} from 'react';
import { ThemeType } from '../types/Types';
import {BarChart} from 'react-native-chart-kit';
import {ThemesContext} from '../context/ThemesContext';
import {View, Dimensions, StyleSheet} from 'react-native';
// import {themes} from '../styles/Theme'; // Ensure themes is imported - REMOVED DUPLICATE

const screenWidth = Dimensions.get('window').width;

export default function MyChart() {
  const {currentThemeName} = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName]; // Get the full theme object

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
        height={180}
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
          color: (opacity = 1) => {
            // Handle potential hex accentColor and apply opacity
            const accent = theme.accentColor;
            if (accent.startsWith('#')) {
              const r = parseInt(accent.slice(1, 3), 16);
              const g = parseInt(accent.slice(3, 5), 16);
              const b = parseInt(accent.slice(5, 7), 16);
              return `rgba(${r}, ${g}, ${b}, ${opacity})`;
            }
            return accent; // If it's already rgba or another format chart kit handles
          },
          labelColor: (opacity = 1) => `rgba(${parseInt(theme.text.slice(1, 3), 16)}, ${parseInt(theme.text.slice(3, 5), 16)}, ${parseInt(theme.text.slice(5, 7), 16)}, ${opacity})`,
          fillShadowGradient: theme.accentColor, // Use accentColor for shadow gradient
          backgroundColor: theme.iconBackground,
          backgroundGradientTo: theme.iconBackground,
          backgroundGradientFrom: theme.iconBackground,
        }}
      />
    </View>
  );
}

const viewStyle = StyleSheet.create({container: {alignItems: 'center'}});
// This style is used to center the chart within its parent container
