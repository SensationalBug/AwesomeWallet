import React, {useContext} from 'react';
import {themes} from '../../styles/Theme';
import {ScrollView, StyleSheet} from 'react-native';
import {ThemesContext} from '../../context/ThemesContext';
import {StyledViewProps, ThemeType} from '../../types/Types';

const StyledView = ({
  children,
  onScroll,
  onScrollEnd,
  horizontal,
  style,
  contentContainerStyle,
}: StyledViewProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  return (
    <ScrollView
      onScroll={onScroll}
      horizontal={horizontal}
      scrollEventThrottle={16}
      onScrollEndDrag={onScrollEnd}
      onMomentumScrollEnd={onScrollEnd}
      contentContainerStyle={contentContainerStyle}
      style={[styles.container, {backgroundColor: theme.background}, style]}>
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
