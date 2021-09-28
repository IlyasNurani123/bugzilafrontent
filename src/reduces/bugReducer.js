import {
  ADD_BUG,
  GET_BUGS,
  GET_BUGS_FAILED,
  ADD_BUG_FAILED,
  ASSIGN_BUGS_TO_USER,
  GET_ASSIGN_BUGS_USER,
  ASSIGN_BUGS_TO_USER_FAILED,
  DELETE_BUG,
  DELETE_BUG_FAILED,
  GET_BUG_IMAGES,
  GET_BUG_IMAGES_FAILED,
  SEARCH_BUG,
  SEARCH_BUG_FAILED,
} from '../constants/action_type';

import { assignBug } from '../services/bugServices';

export const bugReducer = (state, action) => {
  switch (action.type) {
    case GET_BUGS:
      return {
        ...state,
        bugs: action.payload,
        isLoader: true,
      };

    case GET_BUGS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };

    case GET_BUG_IMAGES:
      return {
        ...state,
        bugImages: action.payload,
        isLoader: true,
      };

    case GET_BUG_IMAGES_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };

    case SEARCH_BUG:
      return {
        ...state,
        bugs: action.payload,
        isLoader: true,
      };

    case SEARCH_BUG_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };

    case ADD_BUG:
      return {
        ...state,
        bugs: [...state.bugs, action.payload],
        isLoader: true,
      };

    case ADD_BUG_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };

    case ASSIGN_BUGS_TO_USER:
      return {
        ...state,
        bugs: updateBugReducer(state.bugs, action.payload),
      };

    case ASSIGN_BUGS_TO_USER_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };

    case GET_ASSIGN_BUGS_USER:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };

    case DELETE_BUG:
      return {
        ...state,
        bugs: state.bugs.filter((b) => b.id !== action.payload),
        isLoader: true,
      };

    case DELETE_BUG_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };

    case GET_BUG_IMAGES:
      return {
        ...state,
        bug_images: action.payload,
        isLoader: true,
      };

    case GET_BUG_IMAGES_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoader: false,
      };
    default:
      return state;
  }
};

function updateBugReducer(state, payload) {
  return state.map((bug) => {
    if (bug.id === payload.id) {
      return {
        ...bug,
        ...payload,
      };
    }
    return bug;
  });
}
