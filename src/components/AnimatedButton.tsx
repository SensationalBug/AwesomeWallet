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
  icon,
  color,
  right = 20,
  bottom = 20,
  onPress,
}: AnimatedButtonProps) => {
  const fabStyle = animateFrom ? {[animateFrom]: 16} : {};
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  return (
    <AnimatedFAB
      icon={icon}
      label={label}
      onPress={onPress}
      visible={visible}
      color={color}
      extended={isExtended}
      style={[
        style,
        fabStyle,
        styles.fabStyle,
        {backgroundColor: theme.iconBackground, right, bottom},
      ]}
    />
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  fabStyle: {
    position: 'absolute',
  },
});
