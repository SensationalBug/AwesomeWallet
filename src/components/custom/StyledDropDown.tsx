import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {themes} from '../../styles/Theme';
import {ThemesContext} from '../../context/ThemesContext';
import {StyledDropDownProps, ThemeType} from '../../types/Types';

const StyledDropDown = ({
  data,
  dropdownPosition,
  placeholder,
  value,
  width,
  onChange,
  margin = 20,
}: StyledDropDownProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  console.log(data);
  return (
    <Dropdown
      data={data}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      dropdownPosition={dropdownPosition}
      style={[
        styles.dropdown,
        {
          width,
          margin,
          borderColor: theme.text,
          backgroundColor: theme.background,
        },
      ]}
      activeColor={theme.background}
      itemTextStyle={{color: theme.text}}
      placeholderStyle={{color: theme.text}}
      selectedTextStyle={{color: theme.text}}
      itemContainerStyle={{backgroundColor: theme.background}}
      labelField="label"
      valueField="value"
    />
  );
};

export default StyledDropDown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 15,
    paddingHorizontal: 10,
  },
});
