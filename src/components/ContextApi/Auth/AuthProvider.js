import React from 'react';
import { authReducer } from '../../../reduces/authReducer';
import AuthContext from './AuthContext';

function AuthProvider(props) {
  const initialState = {
    isAuthenticated: false,
    auth: {},
    user: [],
    token: null,
    error: [],
  };

  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const value = { state, dispatch };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
