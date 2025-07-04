import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {themes} from '../../styles/Theme';
import {TextInput} from 'react-native-paper';
import {StyledTextInputProps} from '../../types/Types';
import {ThemesContext, ThemeType} from '../../context/ThemesContext';

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
