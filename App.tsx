import React from 'react';
import Navigation from './src/router/Navigation';
import {ThemesProvider} from './src/context/ThemesContext';
import ThemedSafeArea from './src/components/custom/ThemedSafeArea';

function App(): React.JSX.Element {
  return (
    <ThemesProvider>
      <ThemedSafeArea>
        <Navigation />
      </ThemedSafeArea>
    </ThemesProvider>
  );
}

export default App;
