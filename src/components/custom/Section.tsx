import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {Text} from 'react-native-paper';
import {ThemesContext, ThemeType} from '../../context/ThemesContext';

interface SectionProps {
  text: string;
}

const Section = ({text}: SectionProps) => {
  const theme = useContext(ThemesContext) as ThemeType;

  return (
    <View>
      <Text
        variant="titleLarge"
        style={[styles.text, {color: theme.theme.text}]}>
        {text}
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
