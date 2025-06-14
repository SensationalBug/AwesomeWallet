import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import StyledText from './custom/StyledText';
import {RadioButton} from 'react-native-paper';

type RadioProps = {
  text: string;
  value: string;
  onPress: () => void;
  color?: string;
  status?: 'checked' | 'unchecked';
};

const Radio = ({text, value, onPress, color, status}: RadioProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={Styles.container}>
      <StyledText text={text} variant="titleMedium" />
      <RadioButton
        value={value}
        color={color}
        onPress={onPress}
        status={status}
      />
    </TouchableOpacity>
  );
};

export default Radio;

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
