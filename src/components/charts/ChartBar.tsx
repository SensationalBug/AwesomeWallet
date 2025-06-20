import {View, StyleSheet} from 'react-native';
import React from 'react';
import StyledText from '../custom/StyledText';

const ChartBar = ({height}: any) => {
  return (
    <View style={styles.container}>
      <View style={[styles.content, {height}]} />
      <View style={styles.label}>
        <StyledText text="Categoria" variant="labelLarge" />
      </View>
    </View>
  );
};

export default ChartBar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
  content: {
    width: 70,
    maxHeight: 150,
    backgroundColor: 'yellow',
  },
  label: {
    height: 20,
    justifyContent: 'flex-end',
  },
});
