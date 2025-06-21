import React, {useContext} from 'react';
import {themes} from '../../styles/Theme';
import {ScrollView, StyleSheet} from 'react-native';
import {ThemesContext} from '../../context/ThemesContext';
import {StyledViewProps, ThemeType} from '../../types/Types';

const StyledView = ({children, onScroll, onScrollEnd,horizontal}: StyledViewProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  return (
    <ScrollView
      horizontal={horizontal}
      onScroll={onScroll}
      scrollEventThrottle={16}
      onScrollEndDrag={onScrollEnd}
      onMomentumScrollEnd={onScrollEnd}
      style={[styles.container, {backgroundColor: theme.background}]}>
      {children}
    </ScrollView>
  );
};

export default StyledView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
