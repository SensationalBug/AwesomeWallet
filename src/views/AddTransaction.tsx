import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {themes} from '../styles/Theme';
import {ThemesContext, ThemeType} from '../context/ThemesContext';

import {StyleSheet} from 'react-native';

const AddTransaction = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;

  const theme = themes[currentThemeName.currentThemeName];

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={{color: theme.text}}>
        AddTransaction
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddTransaction;
