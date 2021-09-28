import {
  ADD_PROJECT,
  GET_PROJECTS,
  GET_PROJECTS_FAILED,
  ADD_PROJECTS_FAILED,
  GET_ASSIGN_USER_PROJECT,
  GET_ASSIGN_PROJECT_FAILED,
  ADD_ASSIGN_USER_PROJECT,
  ADD_ASSIGN_PROJECT_FAILED,
  REMOVE_ASSIGN_USER_PROJECT,
  REMOVE_ASSIGN_USER_PROJECT_FAILED,
  DELETE_PROJECT,
  DELETE_PROJECT_FAILED,
  SEARCH_PROJECT,
  UPDATE_PROJECT,
  UPDATE_PROJECT_FAILED,
} from '../constants/action_type';
import { updateProject } from '../services/projectServices';

export const projectReducer = (state, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        project: action.payload,
        isLoader: true,
      };

    case GET_PROJECTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };

    case ADD_PROJECT:
      return {
        ...state,
        project: [...state.project, action.payload],
        isLoader: true,
      };

    case SEARCH_PROJECT:
      return {
        ...state,
        project: action.payload,
        isLoader: true,
      };

    case ADD_PROJECTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };

    case UPDATE_PROJECT:
      return {
        ...state,
        project: updateProjectReducer(state.project, action.payload),
      };

    case UPDATE_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case GET_ASSIGN_USER_PROJECT:
      return {
        ...state,
        assignProject: action.payload,
        isLoader: true,
      };

    case GET_ASSIGN_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };

    case ADD_ASSIGN_USER_PROJECT:
      return {
        ...state,
        assignProject: [...state.assignProject, action.payload],
        isLoader: true,
      };

    case ADD_ASSIGN_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };

    case DELETE_PROJECT:
      return {
        ...state,
        project: state.project.filter((p) => p.id !== action.payload),
        isLoader: true,
      };

    case DELETE_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };

    case REMOVE_ASSIGN_USER_PROJECT:
      return {
        ...state,
        assignProject: state.assignProject.filter(
          (assign) => assign.id !== action.payload
        ),
        isLoader: true,
      };

    case REMOVE_ASSIGN_USER_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };

    default:
      return state;
  }
};

function updateProjectReducer(state, payload) {
  return state.map((project) => {
    if (project.id === payload.id) {
      return {
        ...project,
        ...payload,
      };
    }
    return project;
  });
}
