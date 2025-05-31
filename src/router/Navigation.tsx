import {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemesContext, ThemeType} from '../context/ThemesContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from '../Main';
import AddTransaction from '../views/AddTransaction';
import ThemesOption from '../components/settingsOptions/ThemesOption';
import {themes} from '../styles/Theme';

const Navigation = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
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
              backgroundColor:
                themes[currentThemeName.currentThemeName].background,
            },
            headerShadowVisible: false,
            headerTintColor: themes[currentThemeName.currentThemeName].text,
            headerTitleStyle: {
              fontSize: 24,
              color: themes[currentThemeName.currentThemeName].text,
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
              backgroundColor:
                themes[currentThemeName.currentThemeName].background,
            },
            headerShadowVisible: false,
            headerTintColor: themes[currentThemeName.currentThemeName].text,
            headerTitleStyle: {
              fontSize: 24,
              color: themes[currentThemeName.currentThemeName].text,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
