import React from 'react';

import './assets/index.scss';

import Router from 'router';
import { GlobalProvider } from 'context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  );
}

export default App;
