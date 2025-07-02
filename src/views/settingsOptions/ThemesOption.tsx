import React, {useContext} from 'react';
import Section from '../../components/custom/Section';
import {Text} from 'react-native-paper';
import {themes} from '../../styles/Theme';
import {ThemeType} from '../../types/Types';
import {ThemesContext} from '../../context/ThemesContext';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const ThemesOption = () => {
  const {currentThemeName, storageTheme} = useContext(
    ThemesContext,
  ) as ThemeType;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: themes[currentThemeName].background},
      ]}>
      <View style={[styles.header]}>
        <Section paddingVertical={5} title="Seleccionna tu tema preferido" />
      </View>
      {Object.entries(themes).map(([key, value]: any) => (
        <TouchableOpacity
          style={[
            styles.themeButton,
            {
              backgroundColor: value.background,
            },
          ]}
          key={key}
          onPress={() => storageTheme(key as keyof typeof themes)}>
          <Text style={[styles.text, {color: value.text}]}>{value.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ThemesOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  themeButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
