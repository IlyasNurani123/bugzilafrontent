import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../ContextApi/Auth/AuthContext';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext.isAuthenticated;
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route

    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && restricted ? (
          <Redirect to='/dashboard' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
