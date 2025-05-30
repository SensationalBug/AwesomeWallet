import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {Text} from 'react-native-paper';
import {ThemesContext, ThemeType} from '../../context/ThemesContext';

interface SectionProps {
  title: string;
}

const Section = ({title}: SectionProps) => {
  const theme = useContext(ThemesContext) as ThemeType;

  return (
    <View>
      <Text
        variant="titleLarge"
        style={[styles.text, {color: theme.theme.text}]}>
        {title}
      </Text>
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
});
