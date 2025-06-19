import React, {useContext} from 'react';
import {themes} from '../../styles/Theme';
import {ThemesContext} from '../../context/ThemesContext';
import {SafeAreaView, StatusBar, ViewStyle, StyleSheet} from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const ThemedSafeArea = ({children, style = {}}: Props) => {
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
