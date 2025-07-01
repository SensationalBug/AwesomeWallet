import React, {useEffect} from 'react';
import {inicializarCategorias} from './src/db';
import Toast from 'react-native-toast-message';
import {PaperProvider} from 'react-native-paper';
import Navigation from './src/router/Navigation';
import {toastConfig} from './src/utils/toastAlert';
import {ThemesProvider} from './src/context/ThemesContext';
import {ReportsProvider} from './src/context/ReportsContext';
import {BiometryProvider} from './src/context/BiometryContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CategoriesProvider} from './src/context/CategoriesContext';
import ThemedSafeArea from './src/components/custom/ThemedSafeArea';
import {TransactionProvider} from './src/context/TransactionContext';

const App = (): React.JSX.Element => {
  useEffect(() => {
    inicializarCategorias();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemesProvider>
        <CategoriesProvider>
          <TransactionProvider>
            <ReportsProvider>
              <BiometryProvider>
                <ThemedSafeArea>
                  <PaperProvider>
                    <Navigation />
                    <Toast config={toastConfig} />
                  </PaperProvider>
                </ThemedSafeArea>
              </BiometryProvider>
            </ReportsProvider>
          </TransactionProvider>
        </CategoriesProvider>
      </ThemesProvider>
    </SafeAreaProvider>
  );
};

export default App;
