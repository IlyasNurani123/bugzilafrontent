import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_USERS,
  SET_AUTH_USER,
} from '../constants/action_type';

export const authReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        auth: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        auth: action.payload,
        token: action.token,
      };

    case LOGIN_FAILURE:
      return { ...state, isAuthenticated: false, error: action.payload };

    case SIGN_UP_SUCCESS:
      return { ...state, auth: [...state.auth, action.payload] };

    case SIGN_UP_FAILURE:
      return { ...state, error: action.payload };
    case FETCH_USERS:
      return {
        ...state,
        user: action.payload,
      };
    case 'TOGGLE_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
};
