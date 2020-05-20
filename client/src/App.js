import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './assets/index.scss';

import Header from './components/header';

import { GlobalProvider } from './context/GlobalState';
import Home from './components/home';
import EditExpense from './pages/editExpense';
import AddExpense from './pages/addExpense';

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
            <AddExpense />
          </Route>
          <Route path="/edit/:id">
            <EditExpense />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
