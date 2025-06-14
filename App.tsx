import React, {useEffect} from 'react';
import {inicializarCategorias} from './src/db';
import Toast from 'react-native-toast-message';
import Navigation from './src/router/Navigation';
import {toastConfig} from './src/utils/toastAlert';
import {ThemesProvider} from './src/context/ThemesContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CategoriesProvider} from './src/context/CategoriesContext';
import ThemedSafeArea from './src/components/custom/ThemedSafeArea';
import {TransactionProvider} from './src/context/TransactionContext';

function App(): React.JSX.Element {
  useEffect(() => {
    inicializarCategorias();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemesProvider>
        <CategoriesProvider>
          <TransactionProvider>
            <ThemedSafeArea>
              <Navigation />
              <Toast config={toastConfig} />
            </ThemedSafeArea>
          </TransactionProvider>
        </CategoriesProvider>
      </ThemesProvider>
    </SafeAreaProvider>
  );
}

export default App;
