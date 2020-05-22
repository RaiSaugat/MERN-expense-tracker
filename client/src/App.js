import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './assets/index.scss';

import Header from './components/header';

import { GlobalProvider } from './context/GlobalState';
import Home from './components/home';
import EditExpensePage from './pages/editExpensePage';
import AddExpensePage from './pages/addExpensePage';
import UsersPage from './pages/usersPage';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <main className="main">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/add">
              <AddExpensePage />
            </Route>
            <Route path="/edit/:id">
              <EditExpensePage />
            </Route>
            <Route path="/users">
              <UsersPage />
            </Route>
          </Switch>
        </main>
      </Router>
    </GlobalProvider>
  );
}

export default App;
