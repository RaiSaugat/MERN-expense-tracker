import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Header, PrivateRoute } from 'components';
import {
  HomePage,
  AddExpensePage,
  EditExpensePage,
  UsersPage,
  AuthPage,
} from 'pages';
import { GlobalContext } from 'context/GlobalState';

const Router = () => {
  const { currentUser } = useContext(GlobalContext);
  let routes;

  if (currentUser && currentUser.token) {
    routes = (
      <Switch>
        <PrivateRoute path="/" exact component={HomePage} />
        <PrivateRoute path="/add" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <PrivateRoute path="/users" component={UsersPage} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <BrowserRouter>
      <Header />
      <main className="main">{routes}</main>
    </BrowserRouter>
  );
};

export default Router;
