import React, {useContext, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {ThemesContext, ThemeType} from '../context/ThemesContext';
import {Provider as PaperProvider, TextInput} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View, Keyboard} from 'react-native';
import {
  CategoriesContext,
  CategoriesContextType,
} from '../context/CategoriesContext';
import {themes} from '../styles/Theme';
import {updateState} from '../utils/updateState';
import StyledText from '../components/custom/StyledText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const OPTIONS = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
];

const AddCategory = () => {
  const [newCategory, setNewCategory] = useState({
    name: '',
    icon: '',
  });
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const {addCategory} = useContext(CategoriesContext) as CategoriesContextType;
  const insets = useSafeAreaInsets();
  // Esta linea exportala desde un utils o desde el mismo themes.js
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
              Keyboard.dismiss();
              updateState(setNewCategory, 'icon', item.value);
            }}
          />
        </View>
        <TouchableOpacity
          disabled={!newCategory.name.trim() || !newCategory.icon.trim()}
          onPress={() => {
            const {name, icon} = newCategory;
            if (!name.trim() || !icon.trim()) {
              return;
            }
            addCategory(name.trim(), icon.trim());
            setNewCategory({name: '', icon: ''});
          }}
          style={[
            styles.buttonContainer,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor:
                themes[currentThemeName.currentThemeName].iconBackground,
              opacity:
                !newCategory.name.trim() || !newCategory.icon.trim() ? 0.5 : 1,
            },
          ]}>
          <StyledText
            bold="bold"
            variant="titleLarge"
            text="Agregar categoría"
          />
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonContainer: {
    margin: 20,
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
