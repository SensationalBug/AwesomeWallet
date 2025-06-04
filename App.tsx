import React, {useEffect} from 'react';
import Navigation from './src/router/Navigation';
import { inicializarCategorias } from './src/db';
import {ThemesProvider} from './src/context/ThemesContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemedSafeArea from './src/components/custom/ThemedSafeArea';

function App(): React.JSX.Element {
  useEffect(() => {
    inicializarCategorias();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemesProvider>
        <ThemedSafeArea>
          <Navigation />
        </ThemedSafeArea>
      </ThemesProvider>
    </SafeAreaProvider>
  );
}

export default App;
