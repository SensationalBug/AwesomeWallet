import React, {useContext} from 'react';
import {themes} from '../../styles/Theme';
import {ScrollView, StyleSheet} from 'react-native';
import {ThemesContext, ThemeType} from '../../context/ThemesContext';

interface StyledViewProps {
  children: React.ReactNode;
}

const StyledView = ({children}: StyledViewProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.background}]}>
      {children}
    </ScrollView>
  );
};

export default StyledView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
