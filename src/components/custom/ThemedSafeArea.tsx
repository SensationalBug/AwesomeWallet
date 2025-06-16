import React, {useContext} from 'react';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SafeAreaView, StatusBar, ViewStyle, StyleSheet} from 'react-native';
import {ThemesContext} from '../../context/ThemesContext';
import {themes} from '../../styles/Theme';
import {ThemeType} from '../../types/Types';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const ThemedSafeArea = ({children, style = {}}: Props) => {
  const currentThemeName = useContext(ThemesContext);
  const theme: ThemeType = themes[currentThemeName.currentThemeName];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <StatusBar
        barStyle={theme.barStyle}
        backgroundColor={theme.background}
        translucent={false}
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
