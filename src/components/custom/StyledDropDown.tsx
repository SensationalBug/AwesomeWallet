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
  onChange,
}: StyledDropDownProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  return (
    <Dropdown
      data={data}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      dropdownPosition={dropdownPosition}
      style={[
        styles.dropdown,
        {borderColor: theme.text, backgroundColor: theme.background},
      ]}
      itemTextStyle={{color: theme.text}}
      placeholderStyle={{color: theme.text}}
      selectedTextStyle={{color: theme.text}}
      containerStyle={{backgroundColor: theme.background}}
      itemContainerStyle={{backgroundColor: theme.background}}
      labelField="label"
      valueField="value"
    />
  );
};

export default StyledDropDown;

const styles = StyleSheet.create({
  dropdown: {
    margin: 20,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 15,
    paddingHorizontal: 10,
  },
});
