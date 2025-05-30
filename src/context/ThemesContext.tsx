import {View, StyleSheet} from 'react-native';
import React, {createContext, useState, useEffect} from 'react';
import {themes} from '../styles/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemesContext = createContext({});

export interface ThemeType {
  theme: typeof themes.light;
  currentThemeName: 'light' | 'dark' | 'blue' | 'green';
  setCurrentThemeName: (themeName: 'light' | 'dark' | 'blue' | 'green') => void;
}

export const ThemesProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentThemeName, setCurrentThemeName] = useState<
    'light' | 'dark' | 'blue' | 'green'
  >('dark'); // Default to dark theme
  const [theme, setTheme] = useState(themes.dark);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themes.dark.background,
    },
  });

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (!storedTheme) {
        // Default to light theme if no theme is stored
        await AsyncStorage.setItem('theme', 'light');
        return;
      }
      if (storedTheme === 'dark') {
        setCurrentThemeName('dark');
        setTheme(themes.dark);
      } else if (storedTheme === 'blue') {
        setCurrentThemeName('blue');
        setTheme(themes.blue);
      } else if (storedTheme === 'green') {
        setCurrentThemeName('green');
        setTheme(themes.green);
      } else {
        setCurrentThemeName('light');
        setTheme(themes.light);
      }
    };
    loadTheme();
  }, []);

  return (
    <ThemesContext.Provider
      value={{theme, currentThemeName, setCurrentThemeName}}>
      <View style={styles.container}>{children}</View>
    </ThemesContext.Provider>
  );
};
