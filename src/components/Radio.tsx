// Import necessary React components and types
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native'; // Core React Native components
import StyledText from './custom/StyledText'; // Custom styled text component
import {RadioButton} from 'react-native-paper'; // RadioButton component from react-native-paper

// Type definition for the props of the Radio component
type RadioProps = {
  text: string; // Text label to display next to the radio button.
  value: string; // The value associated with this radio button.
  onPress: () => void; // Function to be called when the radio button is pressed.
  color?: string; // Optional: Color of the radio button when selected.
  status?: 'checked' | 'unchecked'; // Optional: Current status of the radio button.
};

/**
 * Radio component.
 * A custom radio button component that combines a text label with a RadioButton from react-native-paper.
 * The entire area (label and button) is touchable.
 *
 * @param {RadioProps} props - The properties for the component.
 * @returns {JSX.Element} A TouchableOpacity containing a StyledText label and a RadioButton.
 */
const Radio = ({text, value, onPress, color, status}: RadioProps) => {
  return (
    // TouchableOpacity makes the entire row (label + radio button) pressable
    <TouchableOpacity onPress={onPress} style={Styles.container}>
      {/* Display the text label using StyledText for consistent styling */}
      <StyledText text={text} variant="titleMedium" />
      {/* RadioButton component from react-native-paper */}
      <RadioButton
        value={value} // The value this radio button represents
        color={color} // The color of the radio button when selected (themeable)
        onPress={onPress} // Handler for press events
        status={status} // Current status ('checked' or 'unchecked')
      />
    </TouchableOpacity>
  );
};

// Export the Radio component
export default Radio;

// StyleSheet for the component
const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange label and radio button horizontally
    alignItems: 'center', // Align items vertically in the center
    // Add padding or margin as needed for spacing, e.g.:
    // paddingVertical: 8,
    // marginRight: 16, // If used in a row of radio buttons
  },
});
