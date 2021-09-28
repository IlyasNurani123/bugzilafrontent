import React from 'react';
import { projectReducer } from '../../../reduces/projectReducer';
import ProjectContext from './ProjectContext';

function ProjectProvider(props) {
  const initialState = {
    project: [],
    assignProject: [],
    isLoader: false,
    error: null,
  };
  const [state, dispatch] = React.useReducer(projectReducer, initialState);
  const value = { state, dispatch };
  return (
    <ProjectContext.Provider value={value}>
      {props.children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;
