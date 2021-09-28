import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../ContextApi/Auth/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.access_token ? (
          <Component {...props} />
        ) : (
          <Redirect to='/signin' />
        )
      }
    />
  );
};

export default PrivateRoute;
