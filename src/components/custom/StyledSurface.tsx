import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {themes} from '../../styles/Theme';
import {Surface} from 'react-native-paper';
import {ThemesContext} from '../../context/ThemesContext';
import {StyledSurfaceProps, ThemeType} from '../../types/Types';

const StyledSurface = ({
  children,
  style,
  elevation = 3,
  width = '95%',
  height = '45%',
}: StyledSurfaceProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  return (
    <Surface
      elevation={elevation}
      style={[
        style,
        styles.surface,
        {
          width,
          height,
          backgroundColor: theme.iconBackground,
        },
      ]}>
      {children}
    </Surface>
  );
};

export default StyledSurface;

const styles = StyleSheet.create({
  surface: {
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
