import React, {useContext} from 'react';
import {themes} from '../../styles/Theme';
import {ScrollView} from 'react-native';
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
      style={[style, {backgroundColor: theme.background}]}>
      {children}
    </ScrollView>
  );
};

export default StyledView;
