import {themes} from '../styles/Theme';
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemesContext = createContext({});

export const ThemesProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentThemeName, setCurrentThemeName] =
    useState<keyof typeof themes>('light'); // Default to light theme

  const storageTheme = async (themeName: keyof typeof themes) => {
    try {
      await AsyncStorage.setItem('theme', themeName);
      setCurrentThemeName(themeName);
    } catch (error) {
      console.error('Error saving theme to AsyncStorage:', error);
    }
  };

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
      } else if (storedTheme === 'blue') {
        setCurrentThemeName('blue');
      } else if (storedTheme === 'green') {
        setCurrentThemeName('green');
      } else {
        setCurrentThemeName('light');
      }
    };
    loadTheme();
  }, []);

  return (
    <ThemesContext.Provider value={{storageTheme, currentThemeName}}>
      {children}
    </ThemesContext.Provider>
  );
};
