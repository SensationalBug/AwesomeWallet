import React from 'react';
import Navigation from './src/router/Navigation';
import {ThemesProvider} from './src/context/ThemesContext';
import ThemedSafeArea from './src/components/custom/ThemedSafeArea';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
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
