import {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemesContext, ThemeType} from '../context/ThemesContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from '../Main';
import AddTransaction from '../views/AddTransaction';
import ThemesOption from '../components/settingsOptions/ThemesOption';

const Navigation = () => {
  const theme = useContext(ThemesContext) as ThemeType;
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="ThemesOption"
          component={ThemesOption}
          options={{
            title: 'Cambiar tema',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerShadowVisible: false,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="AddTransaction"
          component={AddTransaction}
          options={{
            title: 'Agregar transacción',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerShadowVisible: false,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontSize: 24,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
