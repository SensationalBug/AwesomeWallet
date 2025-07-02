import {useContext, useEffect, useState} from 'react';
import {ThemesContext} from '../context/ThemesContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from '../Main';
import {themes} from '../styles/Theme';
import AddTransaction from '../views/AddTransaction';
import BiometryScreen from '../views/BiometryScreen';
import {RootStackParamList, ThemeType} from '../types/Types';
import TransactionsGrouped from '../views/TransactionsGrouped';
import ThemesOption from '../views/settingsOptions/ThemesOption';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoriesOption from '../views/settingsOptions/CategoriesOption';
import ExportOption from '../views/settingsOptions/ExportOption';

const Navigation = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const Stack = createNativeStackNavigator();
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | undefined
  >('ExportOption');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkBiometricsAndSetInitialRoute = async () => {
      try {
        const success = await AsyncStorage.getItem('biometry');
        if (success === 'true') {
          // Si la biometría está disponible, vamos a BiometryScreen para que pida la huella
          setInitialRoute('BiometryScreen');
        } else {
          // Si no está disponible, vamos directamente a Overview (asumo que Main es tu Overview)
          setInitialRoute('ExportOption'); // O el nombre de tu pantalla "Overview"
        }
      } catch (error) {
        console.error('Error al verificar biometría:', error);
        // En caso de error, por seguridad o fallback, también vamos a Overview
        setInitialRoute('Main'); // O el nombre de tu pantalla "Overview"
      } finally {
        setIsLoading(false); // Terminamos de cargar
      }
    };

    checkBiometricsAndSetInitialRoute();
  }, []); // Se ejecuta solo una vez al montar el componente

  if (isLoading || initialRoute === null) {
    return null;
  }

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
        initialRouteName={initialRoute}
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
        <Stack.Screen
          name="BiometryScreen"
          component={BiometryScreen}
          options={stackScreenOptions(currentThemeName, '')}
        />
        <Stack.Screen
          name="ExportOption"
          component={ExportOption}
          options={stackScreenOptions(currentThemeName, 'Exportar Datos')}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
