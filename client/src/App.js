import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './assets/index.scss';

import Header from './components/header';
import AddExpenseForm from './components/addExpenseForm';

import { GlobalProvider } from './context/GlobalState';
import Home from './components/home';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/add">
            <AddExpenseForm />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
