import React, {useContext} from 'react';
import AddCategory from '../AddCategory';
import {themes} from '../../styles/Theme';
import StyledText from '../custom/StyledText';
import StyledButton from '../custom/StyledButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemesContext, ThemeType} from '../../context/ThemesContext';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  CategoriesContext,
  CategoriesContextType,
} from '../../context/categoriesContext';

const CategoriesOption = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const {categories} = useContext(CategoriesContext) as CategoriesContextType;

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: themes[currentThemeName.currentThemeName].background,
        },
      ]}>
      <FlatList
        data={categories}
        keyExtractor={value => value._id.toString()}
        renderItem={(value: any) => {
          const {name, icon} = value.item;
          return (
            <StyledButton
              title={name}
              iconName={icon}
              onPress={() => console.log(categories)}
            />
          );
        }}
      />
      <AddCategory />
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor:
              themes[currentThemeName.currentThemeName].iconBackground,
          },
        ]}>
        <StyledText bold="bold" variant="titleLarge" text="Agregar categoría" />
      </TouchableOpacity>
    </View>
  );
};

export default CategoriesOption;

const styles = StyleSheet.create({
  container: {flex: 1},
  buttonContainer: {
    margin: 20,
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
