import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {themes} from '../../styles/Theme';
import {TextInput} from 'react-native-paper';
import {ThemesContext} from '../../context/ThemesContext';
import {StyledTextInputProps, ThemeType} from '../../types/Types';

const StyledTextInput: React.FC<StyledTextInputProps> = ({
  label,
  value,
  style,
  length,
  onChangeText,
  mode = 'outlined',
  keyboardType = 'default',
}) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;

  const theme = themes[currentThemeName.currentThemeName];
  return (
    <TextInput
      mode={mode}
      label={label}
      value={value}
      maxLength={12}
      textColor={theme.text}
      outlineColor={theme.text}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      activeOutlineColor={theme.text}
      right={keyboardType == 'default' ? <TextInput.Affix text={`${length}/12`} /> : null}
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
