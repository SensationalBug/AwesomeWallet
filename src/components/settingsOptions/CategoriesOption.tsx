import React, {useContext} from 'react';
import {themes} from '../../styles/Theme';
import StyledText from '../custom/StyledText';
import StyledButton from '../custom/StyledButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemesContext, ThemeType} from '../../context/ThemesContext';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  CategoriesContext,
  CategoriesContextType,
} from '../../context/CategoriesContext';

import type {StackNavigationProp} from '@react-navigation/stack';

type CategoriesOptionProps = {
  navigation: StackNavigationProp<any, any>;
};

const CategoriesOption = ({navigation}: CategoriesOptionProps) => {
  const insets = useSafeAreaInsets();
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const {categories, deleteCategory} = useContext(
    CategoriesContext,
  ) as CategoriesContextType;

  const theme = themes[currentThemeName.currentThemeName];

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: theme.background,
        },
      ]}>
      <FlatList
        data={categories}
        keyExtractor={value => value._id.toString()}
        renderItem={(value: any) => {
          const {name, icon, _id} = value.item;
          return (
            <StyledButton
              title={name}
              iconName={icon}
              onLongPress={() => deleteCategory(_id)}
            />
          );
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AddCategory')}
        style={[
          styles.buttonContainer,
          {
            backgroundColor: theme.iconBackground,
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
