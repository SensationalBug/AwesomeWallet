import {themes} from '../styles/Theme';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {AnimatedFAB} from 'react-native-paper';
import {ThemesContext} from '../context/ThemesContext';
import {AnimatedButtonProps, ThemeType} from '../types/Types';

const AnimatedButton = ({
  style,
  visible,
  animateFrom,
  isExtended,
  label = 'Button',
  onPress,
}: AnimatedButtonProps) => {
  const fabStyle = animateFrom ? {[animateFrom]: 16} : {};
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  return (
    <AnimatedFAB
      icon={'plus'}
      label={label}
      onPress={onPress}
      visible={visible}
      color={theme.text}
      extended={isExtended}
      style={[
        style,
        fabStyle,
        styles.fabStyle,
        {backgroundColor: theme.iconBackground},
      ]}
    />
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  fabStyle: {
    right: 20,
    bottom: 20,
    position: 'absolute',
  },
});
