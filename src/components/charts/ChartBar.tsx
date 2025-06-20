import {View, StyleSheet} from 'react-native';
import React from 'react';

const ChartBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content} />
    </View>
  );
};

export default ChartBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    margin: 5,
    height: '90%',
  },
  content: {
    backgroundColor: 'yellow',
  },
});
