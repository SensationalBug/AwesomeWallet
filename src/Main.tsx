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

  return (
    <Tab.Navigator
      initialRouteName="Settings"
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
        options={{
          title: 'Inicio',
          headerShown: true,
          tabBarIcon: props => tabBarIcon('home', 'home-outline', props),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor:
              themes[currentThemeName.currentThemeName].background,
          },
          headerShadowVisible: false,
          headerTintColor: themes[currentThemeName.currentThemeName].text,
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          title: 'Transacciones',
          headerShown: false,
          tabBarIcon: props => tabBarIcon('grid', 'grid-outline', props),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Ajustes',
          headerShown: true,
          tabBarIcon: props =>
            tabBarIcon('list-circle', 'list-circle-outline', props),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor:
              themes[currentThemeName.currentThemeName].background,
          },
          headerShadowVisible: false,
          headerTintColor: themes[currentThemeName.currentThemeName].text,
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
