import { LOGIN, LOGOUT, SIGNUP } from './actions';

// initial state
export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isInitialized: true,
        user: null,
      };

    case SIGNUP:
      return {
        ...state,
        isLoggedIn: false,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default auth;
