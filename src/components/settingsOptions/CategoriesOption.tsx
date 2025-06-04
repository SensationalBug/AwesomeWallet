import React, {useContext} from 'react';
import AddCategory from '../AddCategory';
import {themes} from '../../styles/Theme';
import StyledText from '../custom/StyledText';
import StyledButton from '../custom/StyledButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemesContext, ThemeType} from '../../context/ThemesContext';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {realm} from '../../db';
import {Category} from '../../db/schemas';

const CategoriesOption = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const insets = useSafeAreaInsets();

  const getCategories = (): Category[] => {
    try {
      const categorias = realm.objects<Category>('Category');
      console.log(Array.from(categorias.sorted('name'))); // Opcional: orden alfabético
      return Array.from(categorias.sorted('name'));
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      return [];
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: themes[currentThemeName.currentThemeName].background,
        },
      ]}>
      <ScrollView>
        <StyledButton iconName="pizza-slice" title="Comida" />
        <StyledButton iconName="bus" title="Transporte" />
        <StyledButton iconName="cocktail" title="Salidas" />
        <StyledButton iconName="home" title="Renta" />
        <StyledButton
          iconName="money-bill-wave"
          title="Salario"
          onPress={() => getCategories()}
        />
        <StyledButton
          iconName="chart-line"
          title="Inversión"
          onPress={() => console.log('Selected value:', 'Inversión')}
        />
        <AddCategory />
      </ScrollView>
      <View
        style={[
          styles.buttonContainer,
          {
            backgroundColor:
              themes[currentThemeName.currentThemeName].iconBackground,
          },
        ]}>
        <TouchableOpacity>
          <StyledText
            bold="bold"
            variant="titleLarge"
            text="Agregar categoría"
          />
        </TouchableOpacity>
      </View>
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
