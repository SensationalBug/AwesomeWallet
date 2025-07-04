// Import necessary React components and types
import React from 'react';
import ChartBar from './charts/ChartBar'; // Custom component for rendering individual chart bars
import {ChartProps, DateGroup} from '../types/Types'; // Type definitions for component props and data structures
import StyledView from './custom/StyledView'; // Custom styled view component (likely a ScrollView wrapper)

/**
 * Chart component.
 * This component renders a bar chart based on the provided data (typically category summaries).
 * It calculates bar heights dynamically based on the maximum value in the dataset.
 *
 * @param {ChartProps} props - The properties for the component.
 * @param {DateGroup['byCategories'] | DateGroup[]} props.data - Array of data objects to be represented in the chart.
 *        Each object should have `name`, `totalDebit`, `totalCredit`. `totalAmount` is also used by ChartBar.
 * @param {number} props.maxHeight - Maximum height for the chart bars.
 * @returns {JSX.Element} A horizontally scrollable view containing chart bars.
 */
const Chart = ({data, maxHeight}: ChartProps) => {
  /**
   * Calculates the maximum absolute value between total credits and total debits
   * across all data points. This is used to scale the chart bars.
   * @returns {number} The maximum absolute value found in the data. Returns 0 if no data or all values are zero.
   */
  const getMaxAbsValue = (): number => {
    let maxCredit = 0;
    let maxDebit = 0;

    // Iterate over data if it exists and is an array
    if (Array.isArray(data)) {
      data.forEach((category: any) => { // `any` is used here due to flexible data prop, consider stricter typing if possible
        // Get credit and debit values, defaulting to 0 if not a number or undefined
        const credit =
          typeof category.totalCredit === 'number' ? category.totalCredit : 0;
        const debit =
          typeof category.totalDebit === 'number' ? category.totalDebit : 0;

        // Update maxCredit if current credit is greater
        if (credit > maxCredit) {
          maxCredit = credit;
        }

        // Update maxDebit if current debit is greater
        if (debit > maxDebit) {
          maxDebit = debit;
        }
      });
    }

    // Calculate absolute maximums
    const absoluteMaxCredit = Math.abs(maxCredit);
    const absoluteMaxDebit = Math.abs(maxDebit);

    // Return the greater of the two absolute maximums, or 1 if both are 0 to avoid division by zero
    const maxVal = Math.max(absoluteMaxCredit, absoluteMaxDebit);
    return maxVal === 0 ? 1 : maxVal; // Avoid division by zero for height calculation
  };

  const currentMaxAbsValue = getMaxAbsValue(); // Calculate this once

  // Render the chart as a horizontal StyledView
  return (
    <StyledView horizontal>
      {/* Map over data to render a ChartBar for each category/data point */}
      {Array.isArray(data) && // Ensure data is an array before mapping
        data.map((category: any, index: number) => {
          const {name, totalDebit = 0, totalCredit = 0, totalAmount = 0} = category; // Default values for safety
          return (
            <ChartBar
              key={index} // Unique key for each bar (using index, consider a more stable key if available)
              text={name} // Text label for the bar (category name)
              maxHeight={maxHeight} // Maximum height for the bar visuals
              debit={totalDebit} // Debit value
              // Calculate height for debit bar segment, scaled by maxHeight
              dHeight={(totalDebit / currentMaxAbsValue) * maxHeight}
              credit={totalCredit} // Credit value
              // Calculate height for credit bar segment, scaled by maxHeight
              cHeight={(totalCredit / currentMaxAbsValue) * maxHeight}
              tAmount={totalAmount} // Total amount (used for tooltip in ChartBar)
            />
          );
        })}
    </StyledView>
  );
};

// Export the Chart component
export default Chart;
