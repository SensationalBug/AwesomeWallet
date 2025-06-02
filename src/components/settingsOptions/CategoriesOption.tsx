import React, {useContext} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import StyledButton from '../custom/StyledButton';
import StyledText from '../custom/StyledText';
import {ThemesContext, ThemeType} from '../../context/ThemesContext';
import {themes} from '../../styles/Theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AddCategory from '../AddCategory';

const CategoriesOption = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
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
      <ScrollView>
        <StyledButton iconName="pizza-slice" title="Comida" />
        <StyledButton iconName="bus" title="Transporte" />
        <StyledButton iconName="cocktail" title="Salidas" />
        <StyledButton iconName="home" title="Renta" />
        <StyledButton iconName="money-bill-wave" title="Salario" />
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
