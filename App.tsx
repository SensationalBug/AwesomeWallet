import React, {useEffect} from 'react';
import {inicializarCategorias} from './src/db';
import Navigation from './src/router/Navigation';
import {ThemesProvider} from './src/context/ThemesContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemedSafeArea from './src/components/custom/ThemedSafeArea';
import {CategoriesProvider} from './src/context/categoriesContext';


function App(): React.JSX.Element {
  useEffect(() => {
    inicializarCategorias();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemesProvider>
        <CategoriesProvider>
          <ThemedSafeArea>
            <Navigation />
          </ThemedSafeArea>
        </CategoriesProvider>
      </ThemesProvider>
    </SafeAreaProvider>
  );
}

export default App;
