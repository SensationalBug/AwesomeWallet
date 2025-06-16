import React, {useContext} from 'react'; // Added useContext
import {StyleSheet, TouchableOpacity} from 'react-native';
import StyledText from './custom/StyledText';
import {RadioButton} from 'react-native-paper';
import {ThemesContext} from '../context/ThemesContext'; // Added ThemesContext
import {themes} from '../styles/Theme'; // Added themes
import {ThemeType} from '../types/Types'; // Added ThemeType

type RadioProps = {
  text: string;
  value: string;
  onPress: () => void;
  // color?: string; // Removed color prop
  status?: 'checked' | 'unchecked';
};

const Radio = ({text, value, onPress, status}: RadioProps) => {
  const {currentThemeName} = useContext(ThemesContext) as ThemeType; // Get theme name
  const theme = themes[currentThemeName]; // Get full theme object

  return (
    <TouchableOpacity onPress={onPress} style={Styles.container}>
      <StyledText text={text} variant="titleMedium" />
      <RadioButton
        value={value}
        color={theme.accentColor} // Use theme.accentColor
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
  },
});
