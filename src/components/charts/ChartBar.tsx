// Import necessary React components, context, and types
import React, {useContext} from 'react';
import {themes} from '../../styles/Theme'; // Theme definitions
import {Tooltip} from 'react-native-paper'; // Tooltip component from react-native-paper
import {View, StyleSheet} from 'react-native'; // Core React Native components
import StyledText from '../custom/StyledText'; // Custom styled text component
import {formatNumber} from '../../utils/formatNumber'; // Utility for formatting numbers
import {ThemesContext} from '../../context/ThemesContext'; // Context for theme data
import {ChartBarProps, ThemeType} from '../../types/Types'; // Type definitions for props and theme
import {TransactionContext} from '../../context/TransactionContext'; // Context for transaction data (currency)

/**
 * ChartBar component.
 * Represents a single bar in a bar chart, typically showing debit and credit amounts.
 * Includes tooltips to display detailed amounts on hover/touch.
 *
 * @param {ChartBarProps} props - The properties for the component.
 * @param {string} props.text - Label for the chart bar (e.g., category name).
 * @param {number} props.debit - Debit amount for this bar.
 * @param {number} props.credit - Credit amount for this bar.
 * @param {number} props.tAmount - Total amount (can be net, or specific to the bar's context for tooltip).
 * @param {number} props.maxHeight - Maximum height the visual bar can occupy.
 * @param {number} props.cHeight - Calculated height for the credit portion of the bar.
 * @param {number} props.dHeight - Calculated height for the debit portion of the bar.
 * @returns {JSX.Element} A View containing the visual bar segments and a label, each with tooltips.
 */
const ChartBar = ({
  text, // Label for the bar
  debit, // Debit amount
  credit, // Credit amount
  tAmount, // Total amount (for tooltip)
  maxHeight, // Max visual height of the bar
  cHeight, // Calculated height for credit part
  dHeight, // Calculated height for debit part
}: ChartBarProps) => {
  // Access current theme and currency from their respective contexts
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName]; // Get theme object
  const {currency} = useContext(TransactionContext); // Get currency symbol

  return (
    // Main container for a single chart bar (visual bar + label)
    <View style={styles.container}>
      {/* Debit bar segment with tooltip */}
      <Tooltip
        enterTouchDelay={250} // Delay before tooltip appears on touch
        leaveTouchDelay={1000} // Delay before tooltip disappears after touch ends
        title={`Debitos: ${currency}${String(formatNumber(debit))}`} // Tooltip content showing formatted debit
      >
        <View
          style={[
            styles.barSegment, // Base style for bar segments
            styles.topBorderRadius, // Apply top border radius
            {
              maxHeight, // Constrain height to maxHeight
              height: dHeight > 0 ? dHeight : 0, // Ensure height is not negative, default to 0
              // Apply negative color from theme if debit exists, otherwise transparent
              backgroundColor: debit ? theme.chartBarNegativeColor : undefined,
            },
          ]}
        />
      </Tooltip>
      {/* Credit bar segment with tooltip */}
      <Tooltip
        enterTouchDelay={250}
        leaveTouchDelay={1000}
        title={`Creditos: ${currency}${String(formatNumber(credit))}`} // Tooltip for credit
      >
        <View
          style={[
            styles.barSegment,
            // Apply top border radius only if it's the top-most segment (credit exists and no debit, or only credit)
            (credit && !debit) || (credit && dHeight === 0)
              ? styles.topBorderRadius
              : null,
            {
              maxHeight,
              height: cHeight > 0 ? cHeight : 0, // Ensure height is not negative
              // Apply positive color from theme if credit exists
              backgroundColor: credit ? theme.chartBarColor : undefined,
            },
          ]}
        />
      </Tooltip>
      {/* Label for the chart bar with tooltip for total amount */}
      <Tooltip
        enterTouchDelay={250}
        leaveTouchDelay={1000}
        title={`Monto total: ${currency}${String(formatNumber(tAmount))}`} // Tooltip for total amount
      >
        <View style={styles.labelContainer}>
          <StyledText text={text} variant="labelLarge" />
        </View>
      </Tooltip>
    </View>
  );
};

// Export the ChartBar component
export default ChartBar;

// StyleSheet for the component
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5, // Horizontal spacing between bars
    alignItems: 'center', // Center items horizontally (bar segments and label)
    justifyContent: 'flex-end', // Align bar from the bottom up
    minHeight: 20 + 5, // Minimum height to accommodate label and some padding
  },
  topBorderRadius: {
    // Style for rounded top corners of bar segments
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  barSegment: {
    // Style for the visual bar segments (debit/credit)
    width: 60, // Fixed width for the bar
    minHeight: 1, // Minimum height to ensure visibility even with zero value
    // backgroundColor is set dynamically based on debit/credit and theme
  },
  labelContainer: {
    // Style for the container of the text label below the bar
    height: 20, // Fixed height for the label area
    marginTop: 5, // Space between the bar and the label
    alignItems: 'center', // Center label text horizontally
    justifyContent: 'center', // Center label text vertically
  },
});
