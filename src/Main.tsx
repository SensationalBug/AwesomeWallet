import {useContext} from 'react';
import {themes} from './styles/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemesContext, ThemeType} from './context/ThemesContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Views import
import Overview from './views/Overview';
import Settings from './views/Settings';
import Transaction from './views/Transaction';

const Tab = createBottomTabNavigator();

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

const Main = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;

  const tabScreenOptions = (
    title: string,
    iconName: string,
    iconNameOutline: string,
  ) => ({
    title: title,
    headerShown: true,
    tabBarIcon: (props: {focused: boolean; color: string}) =>
      tabBarIcon(iconName, iconNameOutline, props),
    headerTitleAlign: 'center' as const,
    headerStyle: {
      backgroundColor: themes[currentThemeName.currentThemeName].background,
    },
    headerShadowVisible: false,
    headerTintColor: themes[currentThemeName.currentThemeName].text,
    headerTitleStyle: {
      fontSize: 24,
      fontWeight: 'bold' as 'bold',
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="Overview"
      screenOptions={{
        tabBarActiveTintColor: themes[currentThemeName.currentThemeName].text,
        tabBarInactiveTintColor:
          themes[currentThemeName.currentThemeName].textLabel,
        tabBarStyle: {
          backgroundColor: themes[currentThemeName.currentThemeName].background,
        },
      }}>
      <Tab.Screen
        name="Overview"
        component={Overview}
        options={tabScreenOptions('Inicio', 'home', 'home-outline')}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={tabScreenOptions('Transacciones', 'grid', 'grid-outline')}
      />
      <Tab.Screen
        name="Ajustes"
        component={Settings}
        options={tabScreenOptions(
          'Ajustes',
          'cog',
          'cog-outline',
        )}
      />
    </Tab.Navigator>
  );
};

export default Main;
