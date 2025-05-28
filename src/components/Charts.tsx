import React from 'react';
import {View, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function MyChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [80, 100, 30, 45, 45, 80],
      },
    ],
  };

  return (
    <View>
      <BarChart
        data={data}
        width={screenWidth - 32}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#0D0F24',
          backgroundGradientFrom: '#0D0F24',
          backgroundGradientTo: '#0D0F24',
          fillShadowGradient: '#3D4169',
          fillShadowGradientOpacity: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: () => '#8C91B2',
          barPercentage: 0.6,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        showValuesOnTopOfBars={false}
        withInnerLines={false}
        fromZero
        yAxisSuffix={''}
      />
    </View>
  );
}
