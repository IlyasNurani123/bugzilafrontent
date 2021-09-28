import React from 'react';
import { bugReducer } from '../../../reduces/bugReducer';
import BugContext from './BugContext';

function BugProvider(props) {
  const initialState = {
    bugs: [],
    bugImages: [],
    assignBug: [],
    error: null,
    isLoader: false,
  };

  const [state, dispatch] = React.useReducer(bugReducer, initialState);
  const value = { state, dispatch };
  return (
    <BugContext.Provider value={value}>{props.children}</BugContext.Provider>
  );
}

export default BugProvider;
