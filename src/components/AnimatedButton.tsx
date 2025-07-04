// Import necessary modules and components
import {themes} from '../styles/Theme';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {AnimatedFAB, FAB} from 'react-native-paper'; // FAB components from react-native-paper
import {ThemesContext} from '../context/ThemesContext'; // Context for theme data
import {AnimatedButtonProps, ThemeType} from '../types/Types'; // Type definitions for props and theme

/**
 * AnimatedButton component.
 * This component renders either an AnimatedFAB (if a label is provided) or a standard FAB.
 * It's a reusable floating action button with theming and animation capabilities.
 *
 * @param {AnimatedButtonProps} props - The properties for the component.
 * @param {string} props.icon - Icon name to display on the button.
 * @param {string} [props.label] - Optional label for the button. If provided, an AnimatedFAB is rendered.
 * @param {string} props.color - Color of the icon and label.
 * @param {StyleProp<ViewStyle>} [props.style] - Custom styles for the button.
 * @param {boolean} [props.visible] - Whether the button is currently visible.
 * @param {() => void} [props.onPress] - Function to execute when the button is pressed.
 * @param {boolean} props.isExtended - Whether the AnimatedFAB is extended (shows the label).
 * @param {boolean} [props.disabled=false] - If true, the button is disabled.
 * @param {number} [props.right=20] - Right offset for absolute positioning.
 * @param {number} [props.bottom=20] - Bottom offset for absolute positioning.
 * @param {string} [props.animateFrom] - Direction from which the button animates (e.g., 'right', 'bottom').
 * @param {number} [props.opacity=1] - Opacity of the button.
 * @returns {JSX.Element} A View containing either an AnimatedFAB or a FAB.
 */
const AnimatedButton = ({
  icon,
  label,
  color,
  style,
  visible,
  onPress,
  isExtended,
  disabled = false, // Default to not disabled
  right = 20, // Default right position
  bottom = 20, // Default bottom position
  animateFrom, // Optional: animation starting side ('left', 'right', 'top', 'bottom')
  opacity = 1, // Default opacity is fully visible
}: AnimatedButtonProps) => {
  // Conditional style for animation based on `animateFrom` prop
  const fabStyle = animateFrom ? {[animateFrom]: 16} : {};
  // Access the current theme from context
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName]; // Get the theme object

  return (
    <View>
      {/* Conditionally render AnimatedFAB if a label is provided, otherwise render a standard FAB */}
      {label ? (
        <AnimatedFAB
          icon={icon}
          label={label}
          color={color} // Icon and label color
          visible={visible} // Visibility state
          onPress={onPress} // Press handler
          extended={isExtended} // Extended state (shows label)
          disabled={disabled} // Disabled state
          style={[
            style, // User-provided custom styles
            fabStyle, // Animation positioning style
            styles.fabStyle, // Base absolute positioning
            // Dynamic styles for background color and positioning offsets
            {backgroundColor: theme.iconBackground, right, bottom, opacity},
          ]}
        />
      ) : (
        <FAB
          icon={icon}
          color={color} // Icon color
          visible={visible}
          onPress={onPress}
          disabled={disabled}
          style={[
            style,
            fabStyle,
            styles.fabStyle,
            {backgroundColor: theme.iconBackground, right, bottom, opacity},
          ]}
        />
      )}
    </View>
  );
};

// Export the component for use in other parts of the application
export default AnimatedButton;

// StyleSheet for the component
const styles = StyleSheet.create({
  fabStyle: {
    position: 'absolute', // FABs are typically positioned absolutely on the screen
  },
});
