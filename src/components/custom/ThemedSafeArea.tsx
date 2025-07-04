import React, {useContext} from 'react';
import {themes} from '../../styles/Theme';
import {ThemeSafeAreaProps} from '../../types/Types';
import {ThemesContext} from '../../context/ThemesContext';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

const ThemedSafeArea = ({children, style = {}}: ThemeSafeAreaProps) => {
  const currentThemeName = useContext(ThemesContext) as {
    currentThemeName: keyof typeof themes;
  };
  const theme = themes[currentThemeName.currentThemeName];

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.background}
        barStyle={
          theme.barStyle as 'default' | 'light-content' | 'dark-content'
        }
      />
      <SafeAreaView style={[style, styles.container]}>{children}</SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThemedSafeArea;
