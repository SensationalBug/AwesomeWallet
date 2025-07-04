// Import necessary modules and components
import {useContext} from 'react';
import {themes} from './styles/Theme';
import {ThemeType} from './types/Types';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemesContext} from './context/ThemesContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Views import
import Reports from './views/Reports';
import Overview from './views/Overview';
import Settings from './views/Settings';
import Transaction from './views/Transaction';
import HeaderFilterButton from './components/HeaderFilterButton';

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

/**
 * Function to render tab bar icons.
 * @param iconName - Name of the icon when tab is focused.
 * @param iconNameOutline - Name of the icon when tab is not focused.
 * @param focused - Boolean indicating if the tab is focused.
 * @param color - Color of the icon.
 * @returns JSX element representing the icon.
 */
const tabBarIcon = (
  iconName: string,
  iconNameOutline: string,
  {focused, color}: {focused: boolean; color: string},
) =>
  focused ? (
    <Icon name={iconName} size={24} color={color} />
  ) : (
    <Icon name={iconNameOutline} size={24} color={color} />
  );

// Main component for the application's tab-based navigation
const Main = () => {
  // Get the current theme name from context to apply theme-specific styles
  const currentThemeName = useContext(ThemesContext) as ThemeType;

  /**
   * Function to configure tab screen options.
   * @param title - Title of the screen.
   * @param iconName - Name of the icon when tab is focused.
   * @param iconNameOutline - Name of the icon when tab is not focused.
   * @returns Object containing screen options for a tab.
   */
  const tabScreenOptions = (
    title: string,
    iconName: string,
    iconNameOutline: string,
  ) => ({
    title: title, // Set the title of the tab screen
    headerShown: true, // Ensure the header is visible for this tab screen
    // Function to render the tab bar icon, changes based on focus state
    tabBarIcon: (props: {focused: boolean; color: string}) =>
      tabBarIcon(iconName, iconNameOutline, props),
    headerTitleAlign: 'center' as const, // Align the header title to the center
    // Style for the header, background color is theme-dependent
    headerStyle: {
      backgroundColor: themes[currentThemeName.currentThemeName].background,
    },
    headerShadowVisible: false, // Hide the shadow under the header
    headerTintColor: themes[currentThemeName.currentThemeName].text, // Color of header text and icons
    // Style for the header title text
    headerTitleStyle: {
      fontSize: 24,
      fontWeight: 'bold' as 'bold',
    },
    // Conditionally render a HeaderFilterButton in the header for specific screens
    headerRight:
      title === 'Inicio' || title === 'Transacciones'
        ? () => <HeaderFilterButton name="filter" /> // Component to render on the right side of the header
        : undefined, // No headerRight component for other screens
  });

  // Return the Tab Navigator with configured screens and styles
  return (
    <Tab.Navigator
      initialRouteName="Overview" // The first tab to be displayed
      // Screen options applicable to all tabs in the navigator
      screenOptions={{
        tabBarActiveTintColor: themes[currentThemeName.currentThemeName].text, // Color for the active tab's icon and label
        tabBarInactiveTintColor:
          themes[currentThemeName.currentThemeName].textLabel, // Color for inactive tabs
        // Style for the tab bar itself, background color is theme-dependent
        tabBarStyle: {
          backgroundColor: themes[currentThemeName.currentThemeName].background,
        },
      }}>
      {/* Definition for the Overview (Inicio) tab screen */}
      <Tab.Screen
        name="Overview"
        component={Overview}
        options={tabScreenOptions('Inicio', 'home', 'home-outline')}
      />
      {/* Definition for the Transaction (Transacciones) tab screen */}
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          ...tabScreenOptions('Transacciones', 'grid', 'grid-outline'),
        }}
      />
      {/* Definition for the Reports (Reportes) tab screen */}
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          ...tabScreenOptions('Reportes', 'bar-chart', 'bar-chart-outline'),
        }}
      />
      {/* Definition for the Settings (Ajustes) tab screen */}
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={tabScreenOptions('Ajustes', 'cog', 'cog-outline')}
      />
    </Tab.Navigator>
  );
};

// Export the Main component to be used in the application
export default Main;
