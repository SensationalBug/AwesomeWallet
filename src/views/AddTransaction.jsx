import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {themes} from '../styles/Theme';
import {ThemesContext, ThemeType} from '../context/ThemesContext';

const AddTransaction = () => {
  const currentThemeName = useContext(ThemesContext);

  return (
    <View
      style={{
        backgroundColor: themes[currentThemeName.currentThemeName].background,
        flex: 1,
      }}>
      <Text style={{color: themes[currentThemeName.currentThemeName].text}}>AddTransaction</Text>
    </View>
  );
};

export default AddTransaction;
