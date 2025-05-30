import React from 'react';
import Navigation from './src/router/Navigation';
import {ThemesProvider} from './src/context/ThemesContext';

function App(): React.JSX.Element {
  return (
    <ThemesProvider>
      <Navigation />
    </ThemesProvider>
  );
}

export default App;
