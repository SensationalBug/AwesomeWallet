import {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemesContext} from '../context/ThemesContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from '../Main';
import AddTransaction from '../views/AddTransaction';
import ThemesOption from '../components/settingsOptions/ThemesOption';
import {themes} from '../styles/Theme';
import CategoriesOption from '../components/settingsOptions/CategoriesOption';
import {ThemeType} from '../types/Types';
import TransactionsGrouped from '../views/TransactionsGrouped';

const Navigation = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const Stack = createNativeStackNavigator();

  const stackScreenOptions = (theme: ThemeType, title: string) => ({
    title,
    headerShown: true,
    headerTitleAlign: 'center' as const,
    headerStyle: {
      backgroundColor: themes[theme.currentThemeName].background,
    },
    headerShadowVisible: false,
    headerTintColor: themes[theme.currentThemeName].text,
    headerTitleStyle: {
      fontSize: 24,
      color: themes[theme.currentThemeName].text,
    },
  });

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
          options={stackScreenOptions(
            currentThemeName,
            'Selecciona tu tema preferido',
          )}
        />
        <Stack.Screen
          name="AddTransaction"
          component={AddTransaction}
          options={stackScreenOptions(currentThemeName, 'Añadir transacción')}
        />
        <Stack.Screen
          name="CategoriesOption"
          component={CategoriesOption}
          options={stackScreenOptions(currentThemeName, 'Categorias')}
        />
        <Stack.Screen
          name="TransactionsGrouped"
          component={TransactionsGrouped}
          options={stackScreenOptions(currentThemeName, 'Transacciones')}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
