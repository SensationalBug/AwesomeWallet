import React from 'react';
import {View} from 'react-native';
import StyledText from './StyledText';
import { SectionProps } from '../../types/Types';

const Section = ({title, paddingVertical = 0}: SectionProps) => {
  return (
    <View style={{paddingVertical}}>
      <StyledText variant="titleLarge" text={title} />
    </View>
  );
};

export default Section;
