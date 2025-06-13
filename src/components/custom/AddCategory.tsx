import {themes} from '../../styles/Theme';
import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {updateState} from '../../utils/updateState';
import {Dropdown} from 'react-native-element-dropdown';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemesContext, ThemeType} from '../../context/ThemesContext';
import {Provider as PaperProvider, TextInput} from 'react-native-paper';

const OPTIONS = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
];

type AddCategoryProps = {
  newCategory: {name: string; icon: string};
  setNewCategory: React.Dispatch<
    React.SetStateAction<{name: string; icon: string}>
  >;
};

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
          <TextInput
            label="Nombre de la nueva categoria"
            mode="outlined"
            textColor={theme.text}
            value={newCategory.name}
            outlineColor={theme.text}
            activeOutlineColor={theme.text}
            style={[styles.textInput, {backgroundColor: theme.background}]}
            onChangeText={(value: string) =>
              updateState(setNewCategory, 'name', value)
            }
          />
          <Dropdown
            dropdownPosition="top"
            style={[
              styles.dropdown,
              {borderColor: theme.text, backgroundColor: theme.background},
            ]}
            itemTextStyle={{color: theme.text}}
            placeholderStyle={{color: theme.text}}
            selectedTextStyle={{color: theme.text}}
            containerStyle={{backgroundColor: theme.background}}
            itemContainerStyle={{backgroundColor: theme.background}}
            data={OPTIONS}
            labelField="label"
            valueField="value"
            placeholder="Selecciona un icono"
            value={newCategory.icon}
            onChange={item => {
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
  textInput: {
    margin: 20,
    marginVertical: 10,
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
