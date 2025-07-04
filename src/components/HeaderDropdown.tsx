// Import necessary React components, context, and types
import {View} from 'react-native'; // Core React Native component
import React, {useContext} from 'react';
import StyledDropDown from './custom/StyledDropDown'; // Custom styled dropdown component
import {ReportsContext} from '../context/ReportsContext'; // Context for reports data
import {ReportsContextType, DateGroup} from '../types/Types'; // Type definitions

/**
 * HeaderDropdown component.
 * This component renders two dropdown menus used for filtering reports:
 * 1. A dropdown to select the period type (e.g., by month, by day).
 * 2. A dropdown to select a specific date/period based on the first selection.
 *
 * @param {object} props - The properties for the component.
 * @param {string | number} [props.width='100%'] - Width of the dropdowns.
 * @returns {JSX.Element} A View containing two StyledDropDown components.
 */
const HeaderDropdown = ({width = '100%'}) => {
  // Access data and functions from ReportsContext
  const {
    periodOptions, // Options for the period type dropdown (e.g., [{label: 'Month', value: 'byMonthYear'}])
    selectedPeriod, // Currently selected period type (e.g., 'byMonthYear')
    setSelectedPeriod, // Function to set the selected period type
    transactionsByDate, // Object containing transactions grouped by different date criteria
    setGlobalTransactions, // Function to set the globally selected transaction group for display
    selectedTransactionValue, // Value of the currently selected specific date/period
    setSelectedTransactionValue, // Function to set the selected specific date/period
  } = useContext(ReportsContext) as ReportsContextType; // Type assertion for context value

  return (
    <View>
      {/* Dropdown for selecting the period type (e.g., by Month, by Day) */}
      <StyledDropDown
        margin={0} // No margin for this dropdown
        width={width} // Set width as per prop
        data={periodOptions} // Data for period type options
        value={selectedPeriod} // Current selected period type
        onChange={item => {
          // When period type changes:
          setSelectedPeriod(item.value); // Update the selected period type in context
          // If the period type actually changed, reset the specific date/transaction selection
          if (selectedPeriod !== item.value) {
            setSelectedTransactionValue(''); // Clear the second dropdown's selection
          }
        }}
      />
      {/* Dropdown for selecting a specific date/period based on the first dropdown's selection */}
      <StyledDropDown
        placeholder="Selecciona una fecha" // Placeholder text
        margin={0} // No margin
        width={width} // Set width
        // Data for this dropdown is dynamically generated based on the selectedPeriod
        // It maps the transactions for the selected period type to dropdown options
        data={
          transactionsByDate[selectedPeriod]?.map((group: DateGroup) => ({
            label: group.name, // Display name of the date group (e.g., "June 2023")
            value: group.name, // Use group name as value (could also be group.sortKey for more precision)
            // Spreading group allows the entire DateGroup object to be passed in `onChange`
            ...group,
          })) || [] // Default to empty array if no data for selectedPeriod
        }
        value={selectedTransactionValue} // Current selected specific date/period
        onChange={item => {
          // When a specific date/period is selected:
          setGlobalTransactions(item as DateGroup); // Set this group as the global transactions for display
          setSelectedTransactionValue(item.value); // Update the selected value for this dropdown
        }}
      />
    </View>
  );
};

// Export the HeaderDropdown component
export default HeaderDropdown;
