// Import necessary React components, hooks, context, and types
import {themes} from '../styles/Theme'; // Theme definitions
import HeaderDropdown from './HeaderDropdown'; // Custom component for the dropdown content
import {ThemesContext} from '../context/ThemesContext'; // Context for theme data
import Icon from 'react-native-vector-icons/FontAwesome5'; // Icon library (FontAwesome5)
import React, {useContext, useRef, useState} from 'react';
import {HeaderFilterButtonProps, ThemeType} from '../types/Types'; // Type definitions for props and theme
import {
  StyleSheet,
  TouchableOpacity, // For making views touchable
  View,
  Animated, // For creating animations
} from 'react-native';

// Define the maximum height for the animated dropdown container
const MAX_CONTENT_HEIGHT = 180;

/**
 * HeaderFilterButton component.
 * This component displays a filter icon button in the header.
 * When pressed, it toggles an animated dropdown containing filtering options (via HeaderDropdown component).
 *
 * @param {HeaderFilterButtonProps} props - The properties for the component. (Currently unused, but defined in types)
 * @returns {JSX.Element} A View containing the filter button and the animated dropdown.
 */
const HeaderFilterButton: React.FC<HeaderFilterButtonProps> = () => {
  // Access the current theme from ThemesContext
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName]; // Get the theme object

  // useRef for the animated value that controls the dropdown's expansion/collapse animation
  const animatedProgress = useRef(new Animated.Value(0)).current;
  // useState to track whether the dropdown is currently expanded or collapsed
  const [expanded, setExpanded] = useState(false);

  // Interpolate the animatedProgress value to control the height of the dropdown
  // When animatedProgress is 0, height is 0; when 1, height is MAX_CONTENT_HEIGHT.
  const interpolatedHeight = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, MAX_CONTENT_HEIGHT],
  });

  // Interpolate the animatedProgress value to control the opacity of the dropdown
  // This creates a fade-in/fade-out effect along with the height animation.
  const interpolatedOpacity = animatedProgress.interpolate({
    inputRange: [0, 0.5, 1], // Opacity goes from 0 to 1, reaching 0.5 midway
    outputRange: [0, 0.5, 1],
  });

  /**
   * Toggles the dropdown's expanded/collapsed state with animation.
   */
  const toggleAnimation = () => {
    if (!expanded) {
      // If currently collapsed, expand the dropdown
      setExpanded(true); // Update state first (or after animation starts, depending on desired UX)
      Animated.timing(animatedProgress, {
        toValue: 1, // Animate progress to 1 (fully expanded)
        duration: 300, // Animation duration in milliseconds
        useNativeDriver: false, // Height and opacity animations on non-View components often require this to be false
      }).start();
    } else {
      // If currently expanded, collapse the dropdown
      Animated.timing(animatedProgress, {
        toValue: 0, // Animate progress to 0 (fully collapsed)
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        // Callback after animation completes
        setExpanded(false); // Update state after collapse animation finishes
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Touchable filter icon button */}
      <TouchableOpacity
        onPress={toggleAnimation} // Call toggleAnimation when pressed
        style={styles.buttonContainer}>
        <Icon name="filter" size={20} color={theme.text} />
      </TouchableOpacity>

      {/* Animated dropdown container, rendered only if 'expanded' is true */}
      {/* Using 'expanded' state to conditionally render helps performance by not having the dropdown in the tree when hidden */}
      {expanded && (
        <Animated.View
          style={[
            styles.dropdownContainer, // Base styles for the dropdown
            {
              // Animated styles
              backgroundColor: theme.iconBackground, // Themed background color
              height: interpolatedHeight, // Animated height
              opacity: interpolatedOpacity, // Animated opacity
            },
          ]}>
          {/* Content of the dropdown */}
          <HeaderDropdown />
        </Animated.View>
      )}
    </View>
  );
};

// Export the component
export default HeaderFilterButton;

// StyleSheet for the component
const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1000, // High zIndex to ensure dropdown appears above other header elements
    position: 'relative', // Necessary for absolute positioning of the dropdownContainer
  },
  buttonContainer: {
    // Styling for the touchable area of the filter button
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownContainer: {
    position: 'absolute', // Positioned absolutely relative to mainContainer
    top: '95%', // Position it slightly below the button (adjust as needed)
    right: 10, // Align to the right side of the header
    width: 200, // Fixed width for the dropdown
    padding: 10, // Internal padding for dropdown content
    elevation: 10, // Shadow for Android
    borderRadius: 8, // Rounded corners
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    justifyContent: 'flex-start', // Align content to the top
    overflow: 'hidden', // Important for height animation to work correctly (clips content)
  },
  // 'addButton' style was defined but not used in this component.
  // It might be a remnant or intended for a different button.
});
