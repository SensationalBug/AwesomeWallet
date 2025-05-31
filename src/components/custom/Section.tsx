import React from 'react';
import {View} from 'react-native';
import StyledText from './StyledText';

interface SectionProps {
  title: string;
  color?: string; // Optional prop for text color
  paddingVertical?: number; // Optional prop for horizontal padding
}

const Section = ({title, paddingVertical = 0}: SectionProps) => {
  return (
    <View style={{paddingVertical}}>
      <StyledText variant="titleLarge" text={title} />
    </View>
  );
};

export default Section;
