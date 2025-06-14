import React, {useContext} from 'react';
import {Text} from 'react-native-paper';

import {themes} from '../../styles/Theme';
import {ThemeType} from '../../types/Types';
import type {TextProps} from 'react-native-paper';
import {ThemesContext} from '../../context/ThemesContext';

type StyledTextProps = {
  text?: string;
  variant?: TextProps<any>['variant'];
  bold?: any; // 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  label?: boolean; // Optional prop to indicate if the text is a label
};

const StyledText = ({
  text,
  variant,
  bold = 'normal',
  label = false,
}: StyledTextProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;

  return (
    <Text
      style={{
        color: label
          ? themes[currentThemeName.currentThemeName].textLabel
          : themes[currentThemeName.currentThemeName].text,
        fontWeight: bold,
      }}
      variant={variant}>
      {text}
    </Text>
  );
};

export default StyledText;
