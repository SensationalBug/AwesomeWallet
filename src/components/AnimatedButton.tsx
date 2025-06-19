import {themes} from '../styles/Theme';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {AnimatedFAB, FAB} from 'react-native-paper';
import {ThemesContext} from '../context/ThemesContext';
import {AnimatedButtonProps, ThemeType} from '../types/Types';

const AnimatedButton = ({
  icon,
  label,
  color,
  style,
  visible,
  onPress,
  isExtended,
  disabled = false,
  right = 20,
  bottom = 20,
  animateFrom,
  opacity = 1,
}: AnimatedButtonProps) => {
  const fabStyle = animateFrom ? {[animateFrom]: 16} : {};
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  return (
    <View>
      {label ? (
        <AnimatedFAB
          icon={icon}
          label={label}
          color={color}
          visible={visible}
          onPress={onPress}
          extended={isExtended}
          disabled={disabled}
          style={[
            style,
            fabStyle,
            styles.fabStyle,
            {backgroundColor: theme.iconBackground, right, bottom, opacity},
          ]}
        />
      ) : (
        <FAB
          icon={icon}
          color={color}
          visible={visible}
          onPress={onPress}
          disabled={disabled}
          style={[
            style,
            fabStyle,
            styles.fabStyle,
            {backgroundColor: theme.iconBackground, right, bottom, opacity},
          ]}
        />
      )}
    </View>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  fabStyle: {
    position: 'absolute',
  },
});
