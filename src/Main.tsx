import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Views import
import Overview from './views/Overview';
import Transaction from './views/Transaction';
import Settings from './views/Settings';
import {useContext} from 'react';
import {ThemesContext, ThemeType} from './context/ThemesContext';

const Tab = createBottomTabNavigator();

const Main = () => {
  const theme = useContext(ThemesContext) as ThemeType;
  return (
    <Tab.Navigator initialRouteName="Settings">
      <Tab.Screen
        name="Overview"
        component={Overview}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Ajustes',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.theme.background,
          },
          headerShadowVisible: false,
          headerTintColor: '#000',
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
