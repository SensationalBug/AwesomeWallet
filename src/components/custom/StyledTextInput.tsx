import React, {useContext} from 'react';
import {TextInput} from 'react-native-paper';
import {ThemesContext} from '../../context/ThemesContext';
import {StyledTextInputProps, ThemeType} from '../../types/Types';
import {themes} from '../../styles/Theme';
import {StyleSheet} from 'react-native';

const StyledTextInput: React.FC<StyledTextInputProps> = ({
  label,
  value,
  mode = 'outlined',
  style,
  keyboardType = 'default',
  onChangeText,
}) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;

  const theme = themes[currentThemeName.currentThemeName];
  return (
    <TextInput
      label={label}
      mode={mode}
      value={value}
      textColor={theme.text}
      outlineColor={theme.text}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      activeOutlineColor={theme.text}
      style={[style, styles.textInput, {backgroundColor: theme.background}]}
    />
  );
};

export default StyledTextInput;

const styles = StyleSheet.create({
  textInput: {
    margin: 20,
    marginVertical: 10,
  },
});
