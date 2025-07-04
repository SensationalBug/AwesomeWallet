// Import necessary React components, hooks, context, and types
import {themes} from '../styles/Theme'; // Theme definitions
import React, {useContext} from 'react';
import StyledText from './custom/StyledText'; // Custom styled text component
import {ThemesContext} from '../context/ThemesContext'; // Context for theme data
import {useNavigation} from '@react-navigation/native'; // Navigation hook from React Navigation
import {ReportsHeaderProps, ThemeType} from '../types/Types'; // Type definitions for props and theme
import {View, TouchableOpacity, StyleSheet} from 'react-native'; // Core React Native components

/**
 * ReportsHeader component.
 * This component renders a header for sections within the reports screen.
 * It typically includes a title on the left and a "View more" button on the right,
 * which navigates to another screen.
 *
 * @param {ReportsHeaderProps} props - The properties for the component.
 * @param {string} props.title - The main title of the header section.
 * @param {string} props.titleButton - Text for the navigation button (e.g., "View more").
 * @param {string} props.goTo - The name of the screen to navigate to when the button is pressed.
 * @param {any} [props.navigationaParams] - Optional parameters to pass to the target screen during navigation.
 * @returns {JSX.Element} A View containing the title and a touchable navigation button.
 */
const ReportsHeader = ({
  title,
  titleButton,
  goTo, // Target screen name
  navigationaParams, // Parameters for the target screen
}: ReportsHeaderProps) => {
  // Access the current theme from ThemesContext
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName]; // Get the theme object
  // Get the navigation object using the useNavigation hook
  const navigation = useNavigation<any>(); // Using 'any' for navigation prop type, consider more specific typing if possible

  return (
    // Main container for the header, styled with theme background
    <View
      style={[
        styles.headerContainer, // Base styles for the header container
        {backgroundColor: theme.iconBackground}, // Apply theme-specific background color
      ]}>
      {/* Display the main title of the header section */}
      <StyledText
        style={styles.headerText} // Styles for the text elements
        variant="titleMedium" // Text variant for styling
        text={title}
      />
      {/* Touchable button for navigation */}
      <TouchableOpacity
        onPress={() => navigation.navigate(goTo, navigationaParams)} // Navigate on press
      >
        {/* Text for the navigation button */}
        <StyledText
          style={styles.headerText} // Re-use text style or create a specific one for button
          variant="titleSmall" // Smaller text variant for the button
          text={titleButton}
        />
      </TouchableOpacity>
    </View>
  );
};

// Export the ReportsHeader component
export default ReportsHeader;

// StyleSheet for the component
const styles = StyleSheet.create({
  // container and ChartView styles were defined but not directly used by the main View of THIS component.
  // They might be from a previous version or intended for a parent component.
  // Renamed ChartViewStyledText to headerContainer for clarity.
  headerContainer: {
    width: '100%', // Header should span the full width
    flexDirection: 'row', // Arrange title and button horizontally
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'space-between', // Space out title and button
    paddingVertical: 8, // Add some vertical padding
    paddingHorizontal: 12, // Add some horizontal padding
    // Consider adding a bottom border for visual separation if needed:
    // borderBottomWidth: 1,
    // borderBottomColor: theme.separatorColor, // Assuming a separatorColor in theme
  },
  headerText: {
    // Common styling for text elements within the header
    padding: 10, // Padding around the text (can be adjusted)
    // Specific text color is handled by StyledText based on theme and variant
  },
});
