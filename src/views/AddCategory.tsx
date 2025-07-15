import React, {useContext} from 'react';
import {themes} from '../styles/Theme';
import {View, StyleSheet} from 'react-native';
import {updateState} from '../utils/updateState';
import {ThemesContext} from '../context/ThemesContext';
import {Provider as PaperProvider} from 'react-native-paper';
import {AddCategoryProps, ThemeType} from '../types/Types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import StyledDropDown from '../components/custom/StyledDropDown';
import StyledTextInput from '../components/custom/StyledTextInput';

const OPTIONS = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
];

const AddCategory = ({newCategory, setNewCategory}: AddCategoryProps) => {
  const insets = useSafeAreaInsets();
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];

  return (
    <PaperProvider>
      <View
        style={[
          styles.container,
          {
            paddingBottom: insets.bottom,
            backgroundColor: theme.background,
          },
        ]}>
        <View>
          <StyledTextInput
            label="Nombre de la nueva categoria"
            value={newCategory.name}
            onChangeText={(value: string) =>
              updateState(setNewCategory, 'name', value)
            }
            length={newCategory.name.length}
          />
          <StyledDropDown
            data={OPTIONS}
            dropdownPosition={'top'}
            value={newCategory.icon}
            placeholder={'Selecciona un icono'}
            onChange={(item: {label: string; value: string}) => {
              updateState(setNewCategory, 'icon', item.value);
            }}
          />
        </View>
      </View>
    </PaperProvider>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'space-between',
  },
  dropdown: {
    margin: 20,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
