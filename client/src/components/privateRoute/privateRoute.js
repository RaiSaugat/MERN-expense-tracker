import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { GlobalContext } from 'context/GlobalState';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(GlobalContext);
  const { token } = currentUser;
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
