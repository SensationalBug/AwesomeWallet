import React, {useContext} from 'react';
import {Text} from 'react-native-paper';
import {themes} from '../../styles/Theme';
import {ThemesContext} from '../../context/ThemesContext';
import {StyledTextProps, ThemeType} from '../../types/Types';

const StyledText = ({
  text,
  variant,
  bold = 'normal',
  label = false,
  style,
}: StyledTextProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;

  return (
    <Text
      style={[
        style,
        {
          color: label
            ? themes[currentThemeName.currentThemeName].textLabel
            : themes[currentThemeName.currentThemeName].text,
          fontWeight: bold,
        },
      ]}
      variant={variant}>
      {text}
    </Text>
  );
};

export default StyledText;
